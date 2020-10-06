/*

/api/play

Validates a player's game session.

Requires:
- Game ID (gameId)
- Player ID (playerId)

Returns:
- Started (start)

*/

// IMPLEMENT: LOAD PREVIOUS IF EXISTS

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { getGame, getPlayer } from "../../src/graphql/queries";

export default async (req, res) => {

    let error, gameData, playerData;

    if (!req.query.gameId || !req.query.playerId) {
        error = "Not all fields are filled.";
    } else {
        gameData = await API.graphql(graphqlOperation(
            getGame,
            {
                id: req.query.gameId
            }
        ));

        if (gameData.data.getGame.id) {

            if (gameData.data.getGame.facts.items.length >= gameData.data.getGame.players.items.length) {

                playerData = await API.graphql(graphqlOperation(
                    getPlayer,
                    {
                        id: req.query.playerId
                    }
                ));

                if (!playerData.data.getPlayer.id) {
                    error = "Invalid player ID."
                } 
            } else {
                error = "Not all players have submitted their facts."
            }
        } else {
            error = "Invalid game ID."
        }
    }

    res.statusCode = 200
    res.json({ 
        start: !error ? true : false,
        time: !error ? gameData.data.getGame.playerSeconds : null,
        error: error
    })
}