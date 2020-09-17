/*

/api/create/player

Creates a new player.

Requires:
- Player name (gameName)
- Game ID, optional for host (gameId)

Returns:
- Player ID (playerId)

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { createPlayer } from "../../../src/graphql/mutations";

export default async (req, res) => {
    let data;

    try {

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


