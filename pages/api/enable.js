/*

/api/enable/game

Enables a game.

Requires:
- Game ID (gameId)
- Host ID (hostId)

Returns:
- Game ID

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { updateGame } from "../../src/graphql/mutations";
import { getGame } from "../../src/graphql/queries";

export default async (req, res) => {
    let data, error = null;

    try {
        data = await API.graphql(graphqlOperation(
            getGame,
            {
                id: req.query.gameId
            }
        ));

        // Check if there are players and if host is specified  
        
        if (data.data.getGame.players.items.length == 1) {
            error = "There are no players in this game.";        
        } else if (req.query.hostId != data.data.getGame.host.id) {
            error = "Insufficient permissions.";   
        } else {
            data = await API.graphql(graphqlOperation(
                updateGame,
                {
                    input: {
                        id: req.query.gameId,
                        enabled: true
                    }
                }
            ));
        }
        
    } catch (err) {
        console.log("Unable to start game: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
        error = err.errors[0].message;
    }

    res.statusCode = 200
    res.json({ 
        enabled: error ? false : true,
        error: error
    })
}