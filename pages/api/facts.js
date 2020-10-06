/*

/api/facts

Either gets a new fact set (GET) or submits a fact set (POST).

Requires:
- Game ID (gameId)
- Player ID (playerId)
- Facts ID (factsId) - POST
- Selected Fact ID (factId) - POST

Returns:
- Set of new facts (facts) - GET
- Video (video) - GET
- Set of facts with validity (facts) - POST

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "../../src/aws-exports.js";

Amplify.configure({ ...awsConfig, ssr: true });

import { getGame, getPlayer, getFacts, getPrevious, getTimer } from "../../src/graphql/queries";
import { updatePrevious, updatePlayer, createTimer, updateTimer, createPrevious } from "../../src/graphql/mutations";

import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    maxRetries: 3
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

export default async (req, res) => {

    let error = null, gameData, playerData;

    if (!req.query.gameId || !req.query.playerId) {
        error = "Not all fields are filled.";
    } else {
        gameData = await API.graphql(graphqlOperation(
            getGame,
            {
                id: req.query.gameId
            }
        ));

        if (gameData.data.getGame) {

            if (gameData.data.getGame.facts.items.length >= gameData.data.getGame.players.items.length) {

                playerData = await API.graphql(graphqlOperation(
                    getPlayer,
                    {
                        id: req.query.playerId
                    }
                ));

                if (playerData.data.getPlayer) {

                    if (req.method === 'POST') {

                        let facts, selected, timer, factsPrevious;

                        if (!req.query.factsId) {
                            error = "Not all fields are filled.";
                        } else if (!playerData.data.getPlayer.timer) {
                            error = "Not currently playing."
                        } else {

                            // Validate facts, check timer
                            // Add to previous (or make previous if it doesn't exist)

                            facts = await API.graphql(graphqlOperation(
                                getFacts,
                                {
                                    id: req.query.factsId
                                }
                            ));

                            timer = await API.graphql(graphqlOperation(
                                getTimer,
                                {
                                    id: playerData.data.getPlayer.timer.id
                                }
                            ));

                            if (!req.query.factId || ((Math.ceil((new Date().getTime())/1000) - timer.time) > (gameData.data.getGame.playerSeconds))) {
                                selected = true;
                            } else {
                                selected = facts.data.getFacts.facts.filter(fact => {
                                    return fact.id == req.query.factId;
                                })[0].valid;
                            }

                            // Implement: check and make sure fact set isn't your's

                            if (playerData.data.getPlayer.previous) {
                                 // Facts already exist in previous
                                if (!(playerData.data.getPlayer.previous.facts.filter(fact => {
                                    return fact.facts == req.query.factsId;
                                    }).length > 0)) {
                                        factsPrevious = await API.graphql(graphqlOperation(
                                            getPrevious,
                                            {
                                                id: playerData.data.getPlayer.previous.id
                                            }
                                        ));

                                        factsPrevious.data.getPrevious.facts.push({facts: req.query.factsId, correct: !selected});

                                        await API.graphql(graphqlOperation(
                                            updatePrevious,
                                            {
                                                input: {
                                                    id: playerData.data.getPlayer.previous.id,
                                                    facts: data.data.getPrevious.facts
                                                }
                                            }
                                        ));
                                    } else {
                                        error = "Fact set already submitted."
                                    }
                            } else {
                                let previous = await API.graphql(graphqlOperation(
                                    createPrevious,
                                    {
                                        input: {
                                            previousGameId: req.query.gameId,
                                            previousPlayerId: req.query.playerId,
                                            facts: 
                                                [{
                                                    facts: req.query.factsId,
                                                    correct: !selected
                                                }]
                                        }
                                    }
                                ));

                                await API.graphql(graphqlOperation(
                                    updatePlayer,
                                    {
                                        input: {
                                            id: req.query.playerId,
                                            playerPreviousId: previous.data.createPrevious.id
                                        }
                                    }
                                ));

                            }

                            // RETURN VALUES (remember, these aren't scrambled, so the facts need their IDs as keys)

                        }
                        res.statusCode = 200
                        res.json({ 
                            facts: (!error) ? facts.data.getFacts.facts : null,
                            correct: (!error) ? !selected : null,
                            error: error
                        })

                    } else {

                        let video, facts, previous, end = false, currentFact = 0;

                        // Get new set of facts (shuffled) + video
                        // Check fact set and get the next one that isn't a) your's and b) in the player's previous
                        // Also resets the timer

                        facts = gameData.data.getGame.facts.items;
                        previous = playerData.data.getPlayer.previous;

                        if (previous) {
                            currentFact = facts.findIndex(factSet => (factSet.id == previous.facts[previous.facts.length - 1].facts)) + 1;        
                        } 

                        if ((currentFact < facts.length) && (facts[currentFact].player.id == req.query.playerId)) {
                            currentFact++;
                        }

                        if (currentFact < facts.length) {

                            let params = {Bucket: 'covalent-user-videos', Key: facts[currentFact].id + '.webm'};

                            await s3.getObject(params)
                            .promise()
                            .then(data => {
                                video = data;
                            })
                            .catch(err => {
                                console.log(err);
                                error = err;
                            }); 

                            facts = await API.graphql(graphqlOperation(
                                getFacts,
                                {
                                    id: facts[currentFact].id
                                }
                            ));

                            shuffle(facts.data.getFacts.facts);
                            
                            if (!playerData.data.getPlayer.timer) {
                                let timer = await API.graphql(graphqlOperation(
                                    createTimer,
                                    {
                                        input: {
                                            timerPlayerId: req.query.playerId,
                                            time: Math.ceil((new Date().getTime()/1000)) + 3
                                            // 3 second grace + ceiling because fetch can be slow
                                        }
                                    }
                                ));

                                await API.graphql(graphqlOperation(
                                    updatePlayer,
                                    {
                                        input: {
                                            id: req.query.playerId,
                                            playerTimerId: timer.data.createTimer.id
                                        }
                                    }
                                ));
                            } else {
                                await API.graphql(graphqlOperation(
                                    updateTimer,
                                    {
                                        input: {
                                            id: playerData.data.getPlayer.timer.id,
                                            time: Math.ceil((new Date().getTime()/1000)) + 3
                                        }
                                    }
                                ));
                            }

                        } else {
                            end = true;
                        }

                        res.statusCode = 200
                        res.json({ 
                            id: (!error && !end) ? facts.data.getFacts.id : null,
                            fact1: (!error && !end) ? { name: facts.data.getFacts.facts[0].name, id: facts.data.getFacts.facts[0].id} : null,
                            fact2: (!error && !end) ? { name: facts.data.getFacts.facts[1].name, id: facts.data.getFacts.facts[1].id} : null,
                            fact3: (!error && !end) ? { name: facts.data.getFacts.facts[2].name, id: facts.data.getFacts.facts[2].id} : null,
                            video: (!error && !end) ? video.Body : null,
                            name: (!error && !end) ? facts.data.getFacts.player.name : null,
                            end: end,
                            error: error
                        })
                    }
                }  else {
                    error = "Player does not exist.";
                    res.statusCode = 200
                    res.json({ 
                        error: error
                    })
                }
            } else {
                error = "Not all players have submitted their facts.";
                res.statusCode = 200
                res.json({ 
                    error: error
                })
            }
        } else {
            error = "Game does not exist.";
            res.statusCode = 200
            res.json({ 
                error: error
            })
        }
    }

        /* 
        Shuffle those facts to the beat
        https://stackoverflow.com/a/6274381
        */

       function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

}