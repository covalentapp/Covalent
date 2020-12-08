/*

/api/submit

Submits a player's facts and video

Requires:
- Facts (fact1, fact2, lie)
- Game ID (gameId)
- Player ID (playerId)
- Video (body)

Returns:
- Submitted (submit)

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig, { s3exports } from "../../src/aws-exports.js";

Amplify.configure({ ...awsConfig, ssr: true });

import { createFacts } from "../../src/graphql/custom_mutations";
import { getGameAndPlayer } from "../../src/graphql/custom_queries/submitQueries";
import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: s3exports.AWS_ACCESS_KEY_ID,
    secretAccessKey: s3exports.SECRET_ACCESS_KEY,
    maxRetries: 3
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

export default async (req, res) => {

    let error, data;
    let link = "";

    try {
        // Ensures all query parts are there
        if (!req.query.fact1 || !req.query.fact2 || !req.query.lie || !req.query.gameId || !req.query.playerId) {
            error = "Not all fields were filled!";
        } else {
            // Get the game and player associated with the IDs given
            data = await API.graphql(graphqlOperation(
                getGameAndPlayer,
                {
                    gameId: req.query.gameId,
                    playerId: req.query.playerId
                }
            ));

            if (data.data.getGame) {
                if (data.data.getPlayer) {
                    // If the player doesn't have a set of facts, add the facts
                    if (!data.data.getPlayer.facts) {
                        data = await API.graphql(graphqlOperation(
                            createFacts,
                            {
                                input: {
                                    factsGameId: req.query.gameId,
                                    factsPlayerId: req.query.playerId,
                                    facts: 
                                        [{
                                            // Random IDs are assigned into a maximum of six digits
                                            // These "fact IDs" are used to validate truths / lies
                                            id: Math.floor(Math.random() * 100000),
                                            name: req.query.fact1,
                                            valid: true,
                                        },
                                        {
                                            id: Math.floor(Math.random() * 100000),
                                            name: req.query.fact2,
                                            valid: true,
                                        },
                                        {
                                            id: Math.floor(Math.random() * 100000),
                                            name: req.query.lie,
                                            valid: false
                                        }],
                                    ttl: Math.floor(new Date().getTime() / 1000) + 86400
                                }
                            }
                        ));

                        /*
                        Get link to upload video with on frontend
                        */

                       let params = {
                            Bucket: 'covalent-user-videos', 
                            Key: data.data.createFacts.id + ".webm", 
                            ContentType: 'video/webm', 
                            ContentEncoding: 'base64'
                        };

                        await s3.getSignedUrlPromise('putObject', params)
                        .then((url) => {
                            link = url;
                        })
                        .catch((err) => {
                            console.log(err);
                            error = "Error creating video link.";
                        });
                    } else {
                        error = "Facts already exist."
                    }
                } else {
                    error = "Player does not exist."
                }
            } else {
                error = "Game does not exist."
            }
        }
    } catch (err) {
        if (err.errors) {
            console.log("Error creating facts: " + err.errors[0].errorType);
            console.log(err.errors[0].message);
            error = err.errors[0].message;
        } else {
            console.log(err);
            error = err;
        }
    }

    res.statusCode = 200
    res.json({ 
        submit: error ? false : true,
        video: error ? null : link,
        error: error
    })
}
