/*

/api/game

Gets a game with a code or ID.

Requires one:
- Game ID (id)
- Game code (code)

Returns:
- Description (name)
- Game enabled (enabled)
- Game ready (ready)
- Host's name (host)
- Player's name (players)

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { getGame, gameByCode } from "../../src/graphql/queries";

export default async (req, res) => {

    let error = null, ready = false, code = null, players = [], data;

    try {
        if (req.query.id || req.query.code) {

            if (req.query.code) {
                data = await API.graphql(graphqlOperation(
                    gameByCode,
                    {
                        code: req.query.code
                    }
                ));

                code = (data.data.gameByCode.items.length != 0) ? data.data.gameByCode.items[0].id : '0';
            }

            data = await API.graphql(graphqlOperation(
                getGame,
                {
                    id: req.query.id ? req.query.id : code
                }
            ));

            if (data.data.getGame) {
                data.data.getGame.players.items.forEach(player => {
                    if (player.id != data.data.getGame.host.id) {
                        players.push(player.name);
                    }
                });

                if (data.data.getGame.facts.items.length >= data.data.getGame.players.items.length) {
                    ready = true;
                }
            } 
        } else {
            error = "No game ID or code specified."
        }
    } catch (err) {
        console.log("Error searching for game: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
        error = err.errors[0].message;
    }

    res.statusCode = 200
    res.json({ 
        id: (!error && data.data.getGame) ? data.data.getGame.id : null,
        name: (!error && data.data.getGame) ? data.data.getGame.name : null,
        enabled: (!error && data.data.getGame) ? data.data.getGame.enabled : null,
        ready: (!error && data.data.getGame) ? ready : null,
        host: (!error && data.data.getGame) ? data.data.getGame.host.name : null,
        players: (!error && data.data.getGame) ? players : null,
        full: (!error && data.data.getGame) ? (players.length == data.data.getGame.playerNum) : null,
        error: error
    })

}