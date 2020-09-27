/*

/api/create/facts

Creates a new set of facts.

Requires:
- Game ID (gameId)
- Player ID (playerId)
- Three facts (fact1, fact2, lie)

Returns:
- Facts ID

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { createFacts } from "../../../src/graphql/mutations";

export default async (req, res) => {
    let data;

    try {

        data = await API.graphql(graphqlOperation(
            createFacts,
            {
                input: {
                    factsGameId: req.query.gameId,
                    factsPlayerId: req.query.playerId,
                    facts: 
                        [{
                            name: req.query.fact1,
                            valid: true,
                        },
                        {
                            name: req.query.fact2,
                            valid: true,
                        },
                        {
                            name: req.query.lie,
                            valid: false
                        }]
                }
            }
        ));

    } catch (err) {
        console.log("Unable to create new facts: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        factsId: data ? data.data.createFacts.id : null
    })
}