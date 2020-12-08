/*

/api/results

Gets the results of a game.

Requires:
- Game ID (id)

Returns:
- Top guessers (guessers)
- Top tricksters (tricksters)
- Number of players in game (numPlayers)
- Number of players that are finished guessing (numPlayersDone)
*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "../../src/aws-exports.js";

Amplify.configure({ ...awsConfig, ssr: true });

import { getGame } from "../../src/graphql/custom_queries/resultsQueries";

export default async (req, res) => {

    let error = null, waiting = false, gameData, guessers = [], tricksters = [], numPlayers = 0, numPlayersDone = 0;

    if (req.query.id) {

        try {
            gameData = await API.graphql(graphqlOperation(
                getGame,
                {
                    id: req.query.id
                }
            ));

            if (gameData.data.getGame) {
                numPlayers = gameData.data.getGame.players.items.length;

                // check if game is even in session
                if (gameData.data.getGame.facts.items.length >= gameData.data.getGame.players.items.length) {
                    // check if all connections exist (everyone has submitted answers)
                    let previousConnections = 0;

                    gameData.data.getGame.previous.items.forEach(previous => {
                        previousConnections += previous.facts.length;

                        // If this player has finished, increment players done.
                        if (previous.facts.length >= numPlayers - 1) {
                            numPlayersDone++;
                        }
                    });


                    // Let's say there's n fact sets. Each person solves n - 1 facts (doesn't include their own facts).
                    // For the total number of previous connections, there should be (n - 1) * the number of players

                    if (previousConnections >= ((gameData.data.getGame.facts.items.length - 1) * gameData.data.getGame.players.items.length)) {

                        // guessers: out of player's previous-es, who got the most correct
                            // tally up each player's previous-es (# correct), keep an array and sort it
                        // tricksters: out of all previous-es, which fact set was incorrect the most times
                            // tally up each fact's incorrects from previous-es, keep an array and sort it
                        
                        let index, player;
                        let facts = gameData.data.getGame.facts.items;
                        let players = gameData.data.getGame.players.items;

                        gameData.data.getGame.previous.items.forEach(previous => {

                            player = players.findIndex(player => (player.id == previous.player.id));

                            previous.facts.forEach(factSet => {
                                index = facts.findIndex(facts => (facts.id == factSet.facts));

                                if (factSet.correct) {
                                    if (players[player].correct) {
                                        players[player].correct++;
                                    } else {
                                        players[player].correct = 1;
                                    }
                                } else {
                                    if (facts[index].incorrect) {
                                        facts[index].incorrect++;
                                    } else {
                                        facts[index].incorrect = 1;
                                    }
                                }
                            });
                            
                        });

                        players.forEach(player => {
                            guessers.push({name: player.name, streak: (player.correct ? player.correct : 0)})
                        })

                        guessers.sort((a,b) => {
                            return (a.streak < b.streak) ? 1 : -1;
                        })

                        facts.forEach(fact => {
                            tricksters.push({
                                name: fact.player.name, 
                                streak: (fact.incorrect ? ((fact.incorrect / (players.length - 1)) * 100) : 0),
                                score: (fact.incorrect ? (fact.incorrect + "/" + (players.length - 1)) : "0/" + (players.length - 1)) + " Tricked"
                            })
                        })

                        tricksters.sort((a,b) => {
                            return (a.streak < b.streak) ? 1 : -1;
                        })

                    
                    } else {
                        error = "Waiting for other players to finish";
                        waiting = true;
                    }
                    
                } else {
                    error = "This game hasn't started yet.";
                }
            } else {
                error = "Game does not exist.";
            }
        } catch (err) {
            console.log("Error fetching results: " + err);
            console.log(err);
            error = err;
        }
    } else {
        error = "No game id provided.";
    }

    res.statusCode = 200
    res.json({ 
        guessers: guessers,
        tricksters: tricksters,
        numPlayers: numPlayers,
        numPlayersDone: numPlayersDone,
        waiting: waiting,
        error: error
    })
}