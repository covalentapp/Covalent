/*

/api/create/game

Creates a new game and links a host player.

Requires:
- Game name (gameName)
- Host ID (gameHost)
- Game type (gameType)

Returns:
- Game ID (gameId)
- Game code (IMPLEMENT - generate non-existing code)

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
                    type: req.query.gameType,
                    enabled: false,
                    // generate random code eventually!
                    code: "random"
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
  