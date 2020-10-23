/*

/api/getFacts

Gets a new fact set and associated video.

Requires:
- Game ID (gameId)
- Player ID (playerId)

Returns:
- Set of new facts (facts)
- Video (video)

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "../../src/aws-exports.js";

Amplify.configure({ ...awsConfig, ssr: true });

import { getGame, getPlayer, getFacts } from "../../src/graphql/queries";
import { updatePlayer, createTimer, updateTimer } from "../../src/graphql/mutations";

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
                                error = "Error getting player's video";
                            }); 

                            try {
                                facts = await API.graphql(graphqlOperation(
                                    getFacts,
                                    {
                                        id: facts[currentFact].id
                                    }
                                ));
                            } catch {
                                error = "Error getting factset"
                            }

                            shuffle(facts.data.getFacts.facts);
                            
                            try {
                                if (!playerData.data.getPlayer.timer) {
                                    let timer = await API.graphql(graphqlOperation(
                                        createTimer,
                                        {
                                            input: {
                                                timerPlayerId: req.query.playerId,
                                                time: Math.ceil((new Date().getTime()/1000)) + 3
                                                // 3 is for a 3 second grace + ceiling because fetch can be slow
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
                            } catch {
                                error = "Error configuring internal timer"
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

}