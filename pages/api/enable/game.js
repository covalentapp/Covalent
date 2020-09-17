/*

/api/enable/game

Enables a game.

Requires:
- Game ID (gameId)
- Number of players (playerNum)
- Seconds for each player (playerSec)

Returns:
- Game ID

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { updateGame } from "../../../src/graphql/mutations";

export default async (req, res) => {
    let data;

    try {

        data = await API.graphql(graphqlOperation(
            updateGame,
            {
                input: {
                    id: req.query.gameId,
                    enabled: true,
                    playerNum: req.query.playerNum,
                    playerSeconds: req.query.playerSec
                }
            }
        ));

    } catch (err) {
        console.log("Unable to start game: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        gameId: data ? data.data.updateGame.id : null
    })
}