import React, { useState, useEffect } from 'react';
import styles from '../../styles/Join.module.css';
import Head from 'next/head';
import SimpleButton from '../../components/SimpleButton.js';

import absoluteUrl from 'next-absolute-url';

export default function JoinGame({ req, error, gameCheck, playerCheck, gameFull }) {

    const [playerName, setName] = useState('');
    const [joined, setJoin] = useState(false);
    const [addedId, playerId] = useState(''); // HAVE THIS UPDATE WHEN NAME ADDED LOCALLY

    /*
    Updates when player name is set and submitted
    */

    useEffect(() => {
        if (joined) {
            addPlayer();
        }

        async function addPlayer() {
            const { origin } = absoluteUrl(req);
            let res, data;
            res = await fetch(origin + '/api/create/player?playerName=' + playerName + '&gameId=' + gameCheck.id);
            data = await res.json();
            if (data.playerId) {
                // playerCheck.id = data.playerId; UPDATE HOOK HERE
            } else {
                gameFull = true;
            }
        }
    }, [joined]);
    
    
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Remote team-building made super simple"
                />
                <link rel="apple-touch-icon" href="/images/logo192.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/favicon.ico" />
                <title>Covalent | Join Game</title>
            </Head>     
            
            {error && 
            <div className={styles.join}>
            <h2>An internal error occurred. We're sorry for the inconvenience.</h2>
            </div>
            }

            {!gameCheck && !error && 
            <div className={styles.join}>
            <h2>Invalid game code.</h2>
            </div>
            }

            {!playerCheck && !joined && gameCheck &&
            <div className={styles.join}>
            <h2>Joining {gameCheck.host}'s game</h2>
            <i className={styles.instructions}>Instructions from host: {gameCheck.name}</i>    
            <input type="text" className={styles.name} placeholder="ENTER YOUR NAME" onChange={event => setName(event.target.value)}></input>
            <SimpleButton name="join game" type="join" onClick={() => setJoin(true)}/>               
            </div>
            }

            {(playerCheck || joined) && !gameFull && !error &&
            <div className={styles.join}>
                <h2>Waiting on {gameCheck.host} to start the game</h2>
            </div>
            }

            {gameFull &&
            <div className={styles.join}>
            <h2>This game is full!</h2>
            </div>
            }
        
        </div>
    );
}

export async function getServerSideProps({ req, params, query }) {
    let res, data, error = null;
    let gameCheck = {};
    let playerCheck = {};
    let gameFull = false;
    let lowerCaseCode = params.game.toLowerCase();
    try {
        const { origin } = absoluteUrl(req);
        res = await fetch(origin + '/api/get/game?code=' + lowerCaseCode);
        data = await res.json();
        // Game doesn't exist
        if (data.game.data.gameByCode.items.length == 0) {
            gameCheck = null;
            playerCheck = null;
        } else {
            gameCheck.host = data.game.data.gameByCode.items[0].host.name;
            gameCheck.name = data.game.data.gameByCode.items[0].name;
            gameCheck.id = data.game.data.gameByCode.items[0].id;
            // Check if game is already full
            res = await fetch(origin + '/api/get/game?gameId=' + gameCheck.id);
            data = await res.json();
            if (data.game.data.getGame.players.items.length >= data.game.data.getGame.playerNum + 1) {
                gameFull = true;
            } else {
                // Make new player
                if (query.name) {
                    res = await fetch(origin + '/api/create/player?playerName=' + query.name + '&gameId=' + gameCheck.id);
                    data = await res.json();
                    if (data.playerId) {
                        playerCheck.id = data.playerId;
                    } else {
                        gameFull = true;
                    }
                } else {
                    playerCheck = null;
                }
            }
            
        }
    } catch {
        error = true;
    }

    return {
        props: {
            error,
            gameCheck,
            playerCheck,
            gameFull
        },
    }
}