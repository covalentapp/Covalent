/*

/api/new

Creates a new game.

Requires:
- Description (name)
- Host name (host)
- Player number (playerNum)
- Player seconds (playerSec)

Returns:
- Game code (code)
- Game ID (gameID)
- Player ID (playerID)

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { createGame, createPlayer, updatePlayer } from "../../src/graphql/mutations";
import { gameByCode } from "../../src/graphql/queries";

export default async (req, res) => {
    let error = null, code = null, data, playerData, gameData;

    try {
        if (!req.query.host || !req.query.name || !req.query.playerNum || !req.query.playerSec) {
            error = "Not all query fields are filled.";
        } else {
            // Create host account
            playerData = await API.graphql(graphqlOperation(
                createPlayer,
                {
                    input: {
                        name: req.query.host,
                        ttl: Math.floor(new Date().getTime() / 1000) + 86400
                    }
                }
            ));
            
            // Check if a randomly generated code exists (from makeid),
            // if not, save the code
            do {
                code = makeid(6);
                data = await API.graphql(graphqlOperation(
                    gameByCode,
                    {
                        code: code
                    }
                ));
            } while (data.data.gameByCode.items.length != 0);

            // Create new game (two truths & lie)
            gameData = await API.graphql(graphqlOperation(
                createGame,
                {
                    input: {
                        name: req.query.name,
                        gameHostId: playerData.data.createPlayer.id,
                        type: "TWO_TRUTHS_AND_LIE",
                        playerNum: req.query.playerNum,
                        playerSeconds: req.query.playerSec,
                        enabled: false,
                        code: code,
                        ttl: Math.floor(new Date().getTime() / 1000) + 86400
                    }
                }
            ));

            // Update host account to reflect the game they're in
            await API.graphql(graphqlOperation(
                updatePlayer,
                {
                    input: {
                        id: playerData.data.createPlayer.id,
                        playerGameId: gameData.data.createGame.id
                    }
                }
            ));

        }
    } catch (err) {
        console.log("Error creating game: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
        error = err.errors[0].message;
    }

    /*
    So random (makes random code)
    https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    */

    function makeid(length) {
        var result = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    res.statusCode = 200
    res.json({ 
        gameID: gameData.data.createGame ? gameData.data.createGame.id : null,
        playerID: playerData.data.createPlayer ? playerData.data.createPlayer.id : null,
        code: code ? code : null,
        error: error
    })

}