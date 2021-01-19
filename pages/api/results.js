/*

/api/results

Gets the results of a game.

Requires:
- Game ID (id)
- Player ID (playerId)

Returns:
- Top guessers (guessers)
- Top tricksters (tricksters)
- Number of players in game (numPlayers)
- Number of players that are finished guessing (numPlayersDone)
- All the fact sets as a list of objects, sorted alphabetically by player name (factSets)
    Note: excludes the requesting player's own fact set
    example:
    [
        {
            "facts": [
                {
                    "name": "truth 1",
                    "valid": true
                    "guessed": true
                },
                {
                    "name": "truth 2",
                    "valid": true
                    "guessed": false
                },
                {
                    "name": "this is the lie",
                    "valid": false
                    "guessed": false
                }
            ],
            "player": {
                "id": "...",
                "name": "Player 1",
            }
        },
        ...
    ]
- Current player's own facts (ownFacts)
    "ownFacts": [
        {
            "name": "truth 1",
            "valid": true
        },
        {
            "name": "truth 2",
            "valid": true
        },
        {
            "name": "this is the lie",
            "valid": false
        }
    ],
*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "../../src/aws-exports.js";

Amplify.configure({ ...awsConfig, ssr: true });

import { getGame } from "../../src/graphql/custom_queries/resultsQueries";

export default async (req, res) => {

    let error = null, waiting = false, factsResponse = null, ownFacts = null, gameData, guessers = [], tricksters = [], numPlayers = 0, numPlayersDone = 0;

    if (!req.query.id || !req.query.playerId) {
        error = "Game ID or Player ID missing.";
        res.statusCode = 200
        res.json({ 
            error: error
        })
    }
    else {

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

                        // loops through each factset to separate ownFacts and factsResponse
                        gameData.data.getGame.facts.items.forEach(factset => {
                            let newFacts = null;

                            // separates out the player's own fact set and pushes to ownFacts
                            if (factset.player.id == req.query.playerId) {
                                ownFacts = factset.facts.map(fact => ({
                                    name: fact.name,
                                    valid: fact.valid,
                                }));        
                            } else {
                                // pushes other fact sets to factResponse (at bottom of else)

                                // This adds in "guessed" field and gets rid of "id" field.
                                newFacts = factset.facts.map(fact => ({
                                    name: fact.name,
                                    valid: fact.valid,
                                    guessed: false,
                                }));

                                // Find the previous object that corresponds to this player's guess on this fact set
                                    // (matching fact set ID and player ID)
                                // Then from the previous object, get the id of the guessed fact (called chosen)
                                // Then for each fact in this set, if fact ID == chosen, set guessed = true, otherwise set guessed = false
                                // gameData.data.getGame.previous.items[i].facts[j].facts is the fact set ID of the previous object
                                // gameData.data.getGame.previous.items[i].facts[j].chosen is the id of the chosen fact
                                // factset.facts[j].id is the id of the individual fact
                                
                                let i, len = gameData.data.getGame.previous.items.length;
                                for (i = 0; i < len; i++) {
                                    let previous = gameData.data.getGame.previous.items[i];
                                    // If this previous object matches the player and the factset
                                    if (previous.player.id == req.query.playerId && previous.facts[0].facts == factset.id) {
                                        factset.facts.forEach(fact => {
                                            // If this fact was the chosen fact, guessed is true, otherwise false
                                            fact.guessed = (fact.id == previous.facts[0].chosen);
                                        });
                                        break;
                                    }
                                }

                                factsResponse.push({
                                    // Each object in factset.facts should have "name", "valid", and "guessed" fields.
                                    facts: newFacts,
                                    // Player should have "id" and "name" fields.
                                    player: factset.player,
                                });
                            }
                        });
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
    }

    res.statusCode = 200
    res.json({ 
        ownFacts: ownFacts,
        factSets: factsResponse,
        guessers: guessers,
        tricksters: tricksters,
        numPlayers: numPlayers,
        numPlayersDone: numPlayersDone,
        waiting: waiting,
        error: error
    })
}