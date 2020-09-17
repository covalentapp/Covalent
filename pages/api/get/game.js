/*

/api/get/game

Gets a game with a code or ID.

Requires (either):
- Game ID (gameId)
- Code (code)

Returns:
- Game

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { getGame, gameByCode } from "../../../src/graphql/queries";

export default async (req, res) => {
    let data;

    try {
        if (req.query.gameId) {
            data = await API.graphql(graphqlOperation(
                getGame,
                {
                    id: req.query.gameId
                }
            ));
        } else if (req.query.code) {
            data = await API.graphql(graphqlOperation(
                gameByCode,
                {
                    code: req.query.code
                }
            ));
        }
    } catch (err) {
        console.log("Error searching for game: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        game: data ? data : null
    })
}