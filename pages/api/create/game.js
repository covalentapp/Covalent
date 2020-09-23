/*

/api/create/game

Creates a new game and links a host player.

Requires:
- Game name (gameName)
- Host ID (gameHost)
- (eventually) Game type (gameType)
- Number of players (playerNum)
- Seconds for each player (playerSec)

Returns:
- Game ID (gameId)

*/


import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { createGame, updatePlayer } from "../../../src/graphql/mutations";

export default async (req, res) => {
    let data;
    try {
        data = await API.graphql(graphqlOperation(
            createGame,
            {
                input: {
                    name: req.query.gameName,
                    gameHostId: req.query.gameHost,
                    type: "TWO_TRUTHS_AND_LIE",
                    playerNum: req.query.playerNum,
                    playerSeconds: req.query.playerSec,
                    enabled: false,
                    code: req.query.code
                }
            }
        ));
        
        await API.graphql(graphqlOperation(
            updatePlayer,
            {
                input: {
                    id: req.query.gameHost,
                    playerGameId: data.data.createGame.id
                }
            }
        ));
    } catch (err) {
        console.log("Unable to create new game: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        gameId: data ? data.data.createGame.id : null
    })
}
  