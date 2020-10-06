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
import awsConfig from "../../src/aws-exports.js";

Amplify.configure({ ...awsConfig, ssr: true });

import { createFacts } from "../../src/graphql/mutations";
import { getGame, getPlayer } from "../../src/graphql/queries";

import formidable from 'formidable-serverless';
import fs from 'fs';
import AWS from 'aws-sdk';

export const config = {
    api: {
      bodyParser: false,
  },
}

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    maxRetries: 3
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

export default async (req, res) => {

    let error, data;

    try {
        if (!req.query.fact1 || !req.query.fact2 || !req.query.lie || !req.query.gameId || !req.query.playerId) {
            error = "Not all fields were filled!";
        } else {
            data = await API.graphql(graphqlOperation(
                getGame,
                {
                    id: req.query.gameId
                }
            ));

            if (data.data.getGame) {

                data = await API.graphql(graphqlOperation(
                    getPlayer,
                    {
                        id: req.query.playerId
                    }
                ));

                if (data.data.getPlayer) {
                    if (!data.data.getPlayer.facts) {
                        data = await API.graphql(graphqlOperation(
                            createFacts,
                            {
                                input: {
                                    factsGameId: req.query.gameId,
                                    factsPlayerId: req.query.playerId,
                                    facts: 
                                        [{
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
                                        }]
                                }
                            }
                        ));

                        const form = new formidable.IncomingForm();
                        form.uploadDir = "/tmp";
                        form.keepExtensions = true;
                        form.parse(req, (err, fields, files) => {
                            if (err) {
                                console.error(err);
                                error = err;
                            }
                            fs.readFile(files?.file.path, function (err, video) {
                                if (err) {
                                    console.error(err);
                                    error = err;
                                }

                                let params = {
                                    Bucket: 'covalent-user-videos', 
                                    Key: data.data.createFacts.id + ".webm", 
                                    Body: Buffer.from(video), 
                                    ContentType: 'video/webm', 
                                    ContentEncoding: 'base64'
                                };
                                s3.upload(params, function(err) {
                                    if (err) {
                                        console.log(err);
                                        error = err;
                                    }
                                });
                                fs.unlink(files?.file.path, function (err) {
                                    if (err) {
                                        console.error(err);
                                        error = err;
                                    }
                                });
                            });

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
        error: error
    })
}
