import React, { useState, useEffect } from 'react';
import styles from '../../styles/Join.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import SimpleButton from '../../components/SimpleButton.js';

const origin = (process.env.NODE_ENV == 'production') ? "https://covalent.app" : "http://localhost:3000";

export default function JoinGame({ error, gameCheck, playerCheck, gameFull }) {

    const [playerName, setName] = useState('');
    const [joined, setJoin] = useState(false);
    const [addedId, playerId] = useState(playerCheck ? playerCheck.id : null); 
    const [addedGameId, gameId] = useState(gameCheck ? gameCheck.id : null);
    const [code, gameCode] = useState(gameCheck ? gameCheck.code : null);
    const [waiting, gameLoading] = useState(playerCheck);

    const router = useRouter();
    
    // Remember: if player is specified beforehand, the IDs are not in the hooks!

    // Implement: if the IDs are in local storage & game ID matches local ID, load the player into the existing game

    // Also: maybe implement framer motion for the new player avatars to make it look nicer

    /* 
    Puts IDs into local storage
    */

    useEffect(() => {
        if (addedId && addedGameId && code) {
            setCookie(null, 'gameID', addedGameId, {
                maxAge: 24 * 60 * 60,
            });
            setCookie(null, 'playerID', addedId, {
                maxAge: 24 * 60 * 60,
            });
            setCookie(null, 'gameCode', code, {
                maxAge: 24 * 60 * 60,
            });
        }
    }, [addedId, addedGameId, code]);

    /*
    Updates when player name is set and submitted
    */

    useEffect(() => {
        if (joined) {
            addPlayer();
        }

        async function addPlayer() {
            let res, data;
            res = await fetch(origin + '/api/create/player?playerName=' + playerName + '&gameId=' + gameCheck.id);
            data = await res.json();
            if (data.playerId) {
                playerId(data.playerId); 
                gameId(gameCheck.id);
                gameLoading(true);
            } else {
                gameFull = true;
            }
        }
    }, [joined]);

    /*
    Checks if game has started
    */

    useEffect(() => {
        if (waiting) {
            checkGame();
        }

        async function checkGame () {
            /* 
            Slow down succeeding API calls to check for new players

            https://www.pentarem.com/blog/how-to-use-settimeout-with-async-await-in-javascript/
            */

            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            let res, data;

            while (waiting) {
                // Implement: only allow to check a certain number of times
                res = await fetch(origin + '/api/get/game?gameId=' + addedGameId);
                data = await res.json();
                if (data.game.data.getGame.enabled) {
                    router.push("/submit");
                    break;
                }  
                await delay(2000);
            }
        }
    }, [waiting]);
    
    
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
                    <h2>Invalid game code. Make sure your host has enabled the game (<Link href="/menu">or join another game</Link>).</h2>
                </div>
            }

            {!playerCheck && !joined && !error && !gameFull && gameCheck &&
                <div className={styles.join}>
                    <h2>Joining {gameCheck.host}'s game</h2>
                    <i className={styles.instructions}>Instructions from host: {gameCheck.name}</i>    
                    <input type="text" className={styles.name} placeholder="ENTER YOUR NAME" onChange={event => setName(event.target.value)}></input>
                    <SimpleButton name="join game" type="join" onClick={() => {
                        if (playerName) {
                            setJoin(true);
                        }
                    }}/>               
                </div>
            }

            {(playerCheck || joined) && !gameFull && !error &&
                <div className={styles.join}>
                    <h2>Waiting on {gameCheck.host} to start the game</h2>
                </div>
            }

            {gameFull &&
                <div className={styles.join}>
                    <h2>This game is full, or the host has already started it. <Link href="/menu">Go join another game!</Link></h2>
                </div>
            }
        
        </div>
    );
}

export async function getServerSideProps({ params, query }) {
    let res, data, error = null;
    let gameCheck = {};
    let playerCheck = {};
    let gameFull = false;
    let lowerCaseCode = params.game.toLowerCase();
    try {
        res = await fetch(origin + '/api/get/game?code=' + lowerCaseCode);
        data = await res.json();
        // Game doesn't exist
        if (data.game.data.gameByCode.items.length == 0) {
            gameCheck = null;
            playerCheck = null;
        } else {
            gameCheck.code = params.game.toLowerCase();
            gameCheck.host = data.game.data.gameByCode.items[0].host.name;
            gameCheck.name = data.game.data.gameByCode.items[0].name;
            gameCheck.id = data.game.data.gameByCode.items[0].id;
            // Check if game is already full / enabled
            res = await fetch(origin + '/api/get/game?gameId=' + gameCheck.id);
            data = await res.json();
            if (data.game.data.getGame.players.items.length >= data.game.data.getGame.playerNum + 1 || data.game.data.getGame.enabled) {
                playerCheck = null;
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
    } catch (err) {
        error = true;
        console.log(err);
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