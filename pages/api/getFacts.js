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
import awsConfig, { s3exports } from "../../src/aws-exports.js";

Amplify.configure({ ...awsConfig, ssr: true });

import { getGame, getPlayer, getFacts } from "../../src/graphql/custom_queries/getFactsQueries";
import { updatePlayer, createTimer, updateTimer } from "../../src/graphql/custom_mutations";

import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: s3exports.AWS_ACCESS_KEY_ID,
    secretAccessKey: s3exports.SECRET_ACCESS_KEY,
    maxRetries: 3
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

export default async (req, res) => {

    let error = null, gameData, playerData;

    if (!req.query.gameId || !req.query.playerId) {
        error = "Not all fields are filled.";
        res.statusCode = 200
        res.json({ 
            error: error
        })
    } else {

            gameData = await API.graphql(graphqlOperation(
                getGame,
                {
                    id: req.query.gameId
                }
            ));
        
        // if the game was found
        if (gameData.data.getGame) {

            // if all players have submitted their facts
            if (gameData.data.getGame.facts.items.length >= gameData.data.getGame.players.items.length) {

                playerData = await API.graphql(graphqlOperation(
                    getPlayer,
                    {
                        id: req.query.playerId
                    }
                ));
                
                // if the player exists
                if (playerData.data.getPlayer) {

                        let video, facts, previous, end = false, currentFact = 0;

                        // Get new set of facts (shuffled) + video
                        // Check fact set and get the next one that isn't a) your's and b) in the player's previous
                        // Also resets the timer

                        facts = gameData.data.getGame.facts.items;
                        previous = playerData.data.getPlayer.previous;

                        // if the player has answered previous questions, get the next one (index of the next one)
                        if (previous) {
                            currentFact = facts.findIndex(factSet => (factSet.id == previous.facts[previous.facts.length - 1].facts)) + 1;        
                        } 

                        // account for player's own fact set (skip it)
                        if ((currentFact < facts.length) && (facts[currentFact].player.id == req.query.playerId)) {
                            currentFact++;
                        }

                        // process fact set
                        if (currentFact < facts.length) {

                            // retrieve video
                            let params = {Bucket: 'covalent-user-videos', Key: facts[currentFact].id + '.webm'};

                           s3.getSignedUrl('getObject', params, (err, url) => {
                               if (err) {
                                console.log(err);
                                error = "Error getting player's video";
                               } else {
                                   video = url;
                               }
                           })

                            // get the associated fact set
                            try {
                                facts = await API.graphql(graphqlOperation(
                                    getFacts,
                                    {
                                        id: facts[currentFact].id
                                    }
                                ));
                            } catch {
                                error = "Error getting fact set";
                            }

                            // shuffle those facts to the beat
                            shuffle(facts.data.getFacts.facts);
                            
                            try {
                                // internal timer: because people can't be trusted on the frontend
                                // internal timer is set when a fact set is retrieved (as a timestamp)
                                // when submitting, the game compares the submission time with the internal timer

                                // checks to see if a timer object exists (won't if it's the first factset)
                                if (!playerData.data.getPlayer.timer) {
                                    let timer = await API.graphql(graphqlOperation(
                                        createTimer,
                                        {
                                            input: {
                                                timerPlayerId: req.query.playerId,
                                                time: Math.ceil((new Date().getTime()/1000)) + 3,
                                                // 3 is for a 3 second grace + ceiling because fetch can be slow
                                                ttl: Math.floor(new Date().getTime() / 1000) + 86400
                                            }
                                        }
                                    ));
                                    
                                    // associates player with timer
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
                                    // use existing timer
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
                                error = "Error configuring internal timer";
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
                            video: (!error && !end) ? video : null,
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