/*

/api/postFacts

Submits a fact set and returns validity.

Requires:
- Game ID (gameId)
- Player ID (playerId)
- Facts ID (factsId)
- Selected Fact ID (factId)

Returns:
- Set of facts with validity (facts)

*/

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsConfig from "../../src/aws-exports.js";

Amplify.configure({ ...awsConfig, ssr: true });

import { getGameAndPlayer, getFacts, getPreviousFacts } from "../../src/graphql/custom_queries/postFactsQueries";
import { updatePrevious, updatePlayer, createPrevious } from "../../src/graphql/mutations";

export default async (req, res) => {

    let error = null, data;

    if (!req.query.gameId || !req.query.playerId) {
        error = "Not all fields are filled.";
        res.statusCode = 200
        res.json({ 
            error: error
        })
    } else {
        data = await API.graphql(graphqlOperation(
            getGameAndPlayer,
            {
                gameId: req.query.gameId,
                playerId: req.query.playerId
            }
        ));
        // game exists
        if (data.data.getGame) {

            // all players have posted their facts
            if (data.data.getGame.facts.items.length >= data.data.getGame.players.items.length) {
                
                // player exists
                if (data.data.getPlayer) {

                        let facts, selected, factsPrevious;

                        if (!req.query.factsId) {
                            error = "Not all fields are filled.";
                        } else if (!data.data.getPlayer.timer) {
                            error = "Not currently playing."
                        } else {
                            // Validate facts
                            // Add to previous (or make previous if it doesn't exist)

                            facts = await API.graphql(graphqlOperation(
                                getFacts,
                                {
                                    id: req.query.factsId
                                }
                            ));
                            
                            // if no answer submitted or time is over, it sets selected to "true".
                            // "true" because a truth is the wrong answer in this case 
                            if (!req.query.factId || ((Math.ceil((new Date().getTime())/1000) - data.data.getPlayer.timer.time) > (data.data.getGame.playerSeconds))) {
                                selected = true;
                            } else {
                                selected = facts.data.getFacts.facts.filter(fact => {
                                    return fact.id == req.query.factId;
                                })[0].valid;
                            }

                            // IMPLEMENT: check and make sure fact set isn't your's

                            if (data.data.getPlayer.previous) {
                                 // Facts already exist in previous
                                if (!(data.data.getPlayer.previous.facts.filter(fact => {
                                    return fact.facts == req.query.factsId;
                                    }).length > 0)) {
                                        factsPrevious = await API.graphql(graphqlOperation(
                                            getPreviousFacts,
                                            {
                                                id: data.data.getPlayer.previous.id
                                            }
                                        ));

                                        factsPrevious.data.getPrevious.facts.push({facts: req.query.factsId, correct: !selected});

                                        await API.graphql(graphqlOperation(
                                            updatePrevious,
                                            {
                                                input: {
                                                    id: data.data.getPlayer.previous.id,
                                                    facts: factsPrevious.data.getPrevious.facts
                                                }
                                            }
                                        ));
                                    } else {
                                        error = "Fact set already submitted."
                                    }
                            } else {
                                let previous = await API.graphql(graphqlOperation(
                                    createPrevious,
                                    {
                                        input: {
                                            previousGameId: req.query.gameId,
                                            previousPlayerId: req.query.playerId,
                                            facts: 
                                                [{
                                                    facts: req.query.factsId,
                                                    correct: !selected
                                                }],
                                            ttl: Math.floor(new Date().getTime() / 1000) + 86400
                                        }
                                    }
                                ));

                                await API.graphql(graphqlOperation(
                                    updatePlayer,
                                    {
                                        input: {
                                            id: req.query.playerId,
                                            playerPreviousId: previous.data.createPrevious.id
                                        }
                                    }
                                ));

                            }

                            // RETURN VALUES (remember, these aren't scrambled, so the facts need their IDs as keys)

                        }
                        res.statusCode = 200
                        res.json({ 
                            facts: (!error) ? facts.data.getFacts.facts : null,
                            correct: (!error) ? !selected : null,
                            error: error
                        })
                }  else {
                    error = "Player does not exist.";
                    res.statusCode = 200
                    res.json({ 
                        error: error
                    })
                }
            } else {
                error = "Not all players have submitted their facts.";
                res.statusCode = 200
                res.json({ 
                    error: error
                })
            }
        } else {
            error = "Game does not exist.";
            res.statusCode = 200
            res.json({ 
                error: error
            })
        }
    }

}