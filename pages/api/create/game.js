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
import { gameByCode } from "../../../src/graphql/queries";

export default async (req, res) => {
    let data;
    try {

        // Check if a game with the same code exists (thanks for the help, GraphQL /s)
        data = await API.graphql(graphqlOperation(
            gameByCode,
            {
                code: req.query.code
            }
        ));

        if (data.data.gameByCode.items.length == 0) {
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
        } else {
            data = null;
            throw {errors: [{errorType: "Game exists", message: "A game with this code already exists"}]};
        }

        
    } catch (err) {
        console.log("Unable to create new game: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        gameId: data ? data.data.createGame.id : null
    })
}
  