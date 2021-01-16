/*

/api/game

Gets a game with a code or ID.

Requires one:
- Game ID (id)
- Game code (code)
Optional:
- Player ID (player)

Returns:
- Description (name)
- Game enabled (enabled)
- Game ready (ready)
- Host's name (host)
- Players' names (players)
- Max player count (playerNum)
- Number of players that have submitted their facts (numPlayersReady)
- Whether optional specified player is in game (isPlayerInGame)
- Game full (full)
- Number of seconds per turn (seconds)
*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../../src/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

import {
  getGame,
  gameByCode,
} from "../../src/graphql/custom_queries/gameQueries";

export default async (req, res) => {
  /* 
    error - string for errors during API call
    ready - all facts have been submitted
    code - ID of game retrieved using code
    players - empty array that eventually lists all players
    data - used for graphql operations
    */

  let error = null,
    ready = false,
    code = null,
    players = [],
    playerStatus = false,
    data;

  try {
    if (req.query.id || req.query.code) {
      if (req.query.code) {
        data = await API.graphql(
          graphqlOperation(gameByCode, {
            code: req.query.code,
          })
        );

        code =
          data.data.gameByCode.items.length != 0
            ? data.data.gameByCode.items[0].id
            : "0";
      }

      data = await API.graphql(
        graphqlOperation(getGame, {
          // If an ID was passed as an argument, use the ID
          id: req.query.id ? req.query.id : code,
        })
      );

      // Valid game found (getGame object isn't null)
      if (data.data.getGame) {
        // All facts have been submitted (ready to show results)
        if (
          data.data.getGame.facts.items.length >=
          data.data.getGame.players.items.length
        ) {
          ready = true;
        }

        // Create a list of player names to return
        data.data.getGame.players.items.forEach((player) => {
          if (player.id != data.data.getGame.host.id) {
            players.push(player.name);
          }
        });

        // If player is specified
        if (req.query.player) {
          //set player status to true if the player is still in game
          playerStatus = data.data.getGame.players.items.some(
            (player) => player.id === req.query.player
          );
        }
      } else {
        error = "Game not found.";
      }
    } else {
      error = "No game ID or code specified.";
    }
  } catch (err) {
    console.log("Error searching for game: " + err.errors[0].errorType);
    console.log(err.errors[0].message);
    error = err.errors[0].message;
  }

  res.statusCode = 200;
  res.json({
    id: !error && data.data.getGame ? data.data.getGame.id : null,
    name: !error && data.data.getGame ? data.data.getGame.name : null,
    enabled: !error && data.data.getGame ? data.data.getGame.enabled : null,
    ready: !error && data.data.getGame ? ready : null,
    host: !error && data.data.getGame ? data.data.getGame.host.name : null,
    players: !error && data.data.getGame ? players : null,
    isPlayerInGame: !error && data.data.getGame ? playerStatus : null,
    playerNum: !error && data.data.getGame ? data.data.getGame.playerNum : null,
    full:
      !error && data.data.getGame
        ? players.length == data.data.getGame.playerNum
        : null,
    seconds:
      !error && data.data.getGame ? data.data.getGame.playerSeconds : null,
    numPlayersReady:
      !error && data.data.getGame ? data.data.getGame.facts.items.length : null,
    error: error,
  });
};
