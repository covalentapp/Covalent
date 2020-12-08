/*

/api/remove

Allows host to remove player

Requires:
- Game ID (id)
- Host ID (host)
- Player number (player)

Returns:
- True/False (success)

*/

/*

---

TODO:
- Write API function (now)
- Allow host to click on avatar name to remove player
    - Give each avatar a number as their key on the frontend
- Show player that they've been removed

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { getGame } from "../../src/graphql/queries";
import { deletePlayer } from "../../src/graphql/mutations";

export default async (req, res) => {
    let data, error = null, removed;

    if (req.query.id && req.query.host && (req.query.player != undefined)) {
        try {
            // Query: get the game specified by the player
            data = await API.graphql(graphqlOperation(
                getGame,
                {
                    id: req.query.id
                }
            ));
            
            // If the game exists and the player exists in the array
            if (data.data.getGame && (data.data.getGame.players.items.length() > req.query.player)) {
                let playerId = data.data.getGame.players.items[req.query.player];
                let hostId = data.data.getGame.host.id;

                if (req.query.hostId != hostId) {
                    // host id does not match
                    error = "Insufficient Permissions.";
                } else if (data.data.getGame.players.items.length == 1) {
                    // only host is in the game
                    error = "No players to remove.";
                } else if (data.data.getGame.enabled) {
                    // the game is in session
                    error = "Can't remove players while game is in session."
                } else {
                    removed = await API.graphql(graphqlOperation(
                        deletePlayer,
                        {
                            input: {
                                id: playerId
                            }
                        }
                    ));
                }

                /*

                What you need to code in place of this comment:
                - Compare the host ID of the game to the host ID given as a query in req.query.host
                    - If it's not the same, set error string to a message saying the user has insufficient permissions
                - If it's the same, run the mutation "deletePlayer" with the following input:
                    input: {
                        id: playerId
                    }
                - Be advised: the syntax of running a mutation looks slightly different than running a query (like above with the game)
                    Check how I've written mutations before in other files (like createPlayer in api/join.js)
                
                - Making sure that the game hasn't started yet.
                    - If / else that wraps that other if / else for the mutation
                    
                */

            } else {
                error = "Game / player not found.";
            }
            
        } catch (err) {
            console.log("Unable to remove player: " + err.errors[0].errorType);
            console.log(err.errors[0].message);
            error = err.errors[0].message;
        }
    } else {
        error = "Please fill out all the fields.";
    }

    res.statusCode = 200
    res.json({ 
        success: error ? false : true,
        error: error
    })
}