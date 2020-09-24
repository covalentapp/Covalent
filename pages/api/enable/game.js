/*

/api/enable/game

Enables a game.

Requires:
- Game ID (gameId)

Returns:
- Game ID

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { updateGame } from "../../../src/graphql/mutations";
import { getGame } from "../../../src/graphql/queries";

export default async (req, res) => {
    let data;

    try {

        // Check if there are players
        data = await API.graphql(graphqlOperation(
            getGame,
            {
                id: req.query.gameId
            }
        ));

        if (data.data.getGame.players.items.length > 1) {
            data = await API.graphql(graphqlOperation(
                updateGame,
                {
                    input: {
                        id: req.query.gameId,
                        enabled: true
                    }
                }
            ));
        } else {
            data = null;
            throw {errors: [{errorType: "No players", message: "There are no players in this game"}]};
        }
        

    } catch (err) {
        console.log("Unable to start game: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
    }

    res.statusCode = 200
    res.json({ 
        gameId: data ? data.data.updateGame.id : null
    })
}