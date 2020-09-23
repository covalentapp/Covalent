/*

/api/create/player

Creates a new player.

Requires:
- Player name (playerName)
- Game ID, optional for host (gameId)

Returns:
- Player ID (playerId)

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { createPlayer } from "../../../src/graphql/mutations";
import { getGame } from "../../../src/graphql/queries";

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

            // Accounts for player number + game host doesn't count
            if (data.data.getGame.players.items.length >= data.data.getGame.playerNum + 1) {
                data = null;
                throw {errors: [{errorType: "Full game", message: "The game is already full."}]};
            }

            // Checks if game is already enabled
            if (data.data.getGame.enabled) {
                data = null;
                throw {errors: [{errorType: "Already started", message: "This game has already started."}]};
            }
        }

        data = await API.graphql(graphqlOperation(
            createPlayer,
            {
                input: {
                    name: req.query.playerName,
                    playerGameId: req.query.gameId // will give null value in DB if undefined
                }
            }
        ));

    } catch (err) {
        console.log("Unable to create new player: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        playerId: data ? data.data.createPlayer.id : null
    })
}


