/*

/api/join

Joins a game with a code.

Requires:
- Game code (code)
- Player name (playerName)
- (optional) Player id (playerId)
- (optional) Game id (gameId)

Returns:
- Game ID (gameID)
- Player ID (playerID)

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import { createPlayer } from "../../src/graphql/custom_mutations";
import { gameByCode } from "../../src/graphql/custom_queries/joinQueries";

export default async (req, res) => {
    let gameData, playerData, playerId, error = null;

    try {
        if (req.query.code && req.query.playerName) {
            gameData = await API.graphql(graphqlOperation(
                gameByCode,
                {
                    code: req.query.code
                }
            ));
            
            if (gameData.data.gameByCode.items.length != 0) {
                // If this user already has a player id that matches a player in this game,
                // then don't create a new player, just return the same player id (refresh support).
                if (req.query.playerId !== undefined &&
                    req.query.gameId !== undefined &&
                    req.query.gameId === gameData.data.gameByCode.items[0].id &&
                    gameData.data.gameByCode.items[0].players.items.some((player) => player.id === req.query.playerId)) {
                        playerId = req.query.playerId;
                // Accounts for player number + game host doesn't count
                } else if (gameData.data.gameByCode.items[0].players.items.length >= gameData.data.gameByCode.items[0].playerNum + 1) {
                    error = "This game is full.";
                } else if (gameData.data.gameByCode.items[0].enabled) {
                    // Checks if game is already enabled
                    error = "This game has already started.";
                } else {
                    playerData = await API.graphql(graphqlOperation(
                        createPlayer,
                        {
                            input: {
                                name: req.query.playerName,
                                playerGameId: gameData.data.gameByCode.items[0].id,
                                ttl: Math.floor(new Date().getTime() / 1000) + 86400
                            }
                        }
                    ));
                    playerId = playerData.data.createPlayer.id;
                }
            } else {
                error = "Game not found."
            }
        } else {
            error = "A game code and player name were not provided."
        }

    } catch (err) {
        console.log("Unable to create new player: " + err.errors[0].errorType);
        console.log(err.errors[0].message);
        error = err.errors[0].message;
    }

    res.statusCode = 200
    res.json({ 
        gameID: !error ? gameData.data.gameByCode.items[0].id : null,
        playerID: !error ? playerId : null,
        error: error
    })
}