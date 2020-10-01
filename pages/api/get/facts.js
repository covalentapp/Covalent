/*

/api/get/game

Gets a game with a code or ID.

Requires (either):
- Facts ID (factsId)

Returns:
- Facts

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { getFacts } from "../../../src/graphql/queries";

export default async (req, res) => {
    let data;

    try {

        data = await API.graphql(graphqlOperation(
            getFacts,
            {
                id: req.query.factsId
            }
        ));
        
    } catch (err) {
        console.log("Error searching for facts: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        facts: data ? data.data.getFacts.facts : null,
        name: data ? data.data.getFacts.player.name : null,
        playerId: data ? data.data.getFacts.player.id : null
    })
}