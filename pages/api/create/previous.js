/*

/api/create/previous

Creates a new previous connection.

Requires:
- Previous ID (previousId) - if adding to an existing list
- Game ID (gameId) 
- Player ID (playerId) 
- Facts ID (factsId)
- Correct (correct)

Returns:
- Previous connection ID

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { createPrevious, updatePrevious } from "../../../src/graphql/mutations";
import { getPrevious } from "../../../src/graphql/queries";

export default async (req, res) => {
    let data;

    try {
        if (req.query.previousId) {
            data = await API.graphql(graphqlOperation(
                getPrevious,
                {
                    id: req.query.previousId
                }
            ));
            
            data.data.getPrevious.facts.push({facts: req.query.factsId, correct: req.query.correct});

            data = await API.graphql(graphqlOperation(
                updatePrevious,
                {
                    input: {
                        id: req.query.previousId,
                        facts: data.data.getPrevious.facts
                    }
                }
            ));
        } else {
            data = await API.graphql(graphqlOperation(
                createPrevious,
                {
                    input: {
                        previousGameId: req.query.gameId,
                        previousPlayerId: req.query.playerId,
                        facts: 
                            [{
                                facts: req.query.factsId,
                                correct: req.query.correct
                            }]
                    }
                }
            ));
        }
    } catch (err) {
        console.log("Unable to create new previous connection: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    if (req.query.previousId) {
        res.json({ 
            previousId: data ? data.data.updatePrevious.id : null,
            connections: data ? data.data.updatePrevious.facts : null
        })
    } else {
        res.json({ 
            previousId: data ? data.data.createPrevious.id : null,
            connections: data ? data.data.createPrevious.facts : null
        })
    }
    
}