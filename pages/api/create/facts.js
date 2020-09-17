/*

/api/create/facts

Creates a new set of facts.

Requires:
- Game ID (gameId)
- Player ID (playerId)
- Three facts (fact1, fact2, fact3)
- Three statuses (status1, status2, status3)

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
                            valid: req.query.status1,
                        },
                        {
                            name: req.query.fact2,
                            valid: req.query.status2,
                        },
                        {
                            name: req.query.fact3,
                            valid: req.query.status3
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