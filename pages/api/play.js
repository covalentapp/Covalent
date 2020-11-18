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

import { getGameAndPlayerID } from "../../src/graphql/custom_queries/playQueries";

export default async (req, res) => {

    let error, data;

    if (!req.query.gameId || !req.query.playerId) {
        error = "Not all fields are filled.";
    } else {
        data = await API.graphql(graphqlOperation(
            getGameAndPlayerID,
            {
                gameId: req.query.gameId,
                playerId: req.query.playerId
            }
        ));

        if (!data.data.getGame.id) {
            error = "Invalid game ID."
        } else if (data.data.getGame.facts.items.length < data.data.getGame.players.items.length) {
            // All the facts are submitted when length of facts equals length of players
            error = "Not all players have submitted their facts."
        } else if (!data.data.getPlayer.id) {
            error = "Invalid player ID."
        }
    }

    res.statusCode = 200
    res.json({ 
        start: !error ? true : false,
        time: !error ? data.data.getGame.playerSeconds : null,
        error: error
    })
}