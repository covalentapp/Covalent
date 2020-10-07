import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import SimpleButton from '../components/SimpleButton';
import Avatar from '../components/Avatar';
import styles from '../styles/Settings.module.css';

/*This file is for the Settings component for Covalent
@Catherine*/

const origin = (process.env.NODE_ENV == 'production') ? "https://covalent.app" : "http://localhost:3000";

export default function Settings() {

    const [code, setCode] = useState('');
    const [copied, setCopied] = useState(false);
    const [time, setTime] = useState(30);
    const [players, setPlayers] = useState(2);
    const [instructions, setInstructions] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [started, setStart] = useState(false);
    const [searching, setOpen] = useState(false);
    const [gameId, setId] = useState('');
    const [hostId, selfId] = useState('');
    const [gamePlayers, addPlayers] = useState([]);


    const router = useRouter();

    /* 
    Slow down succeeding API calls to check for new players

    https://www.pentarem.com/blog/how-to-use-settimeout-with-async-await-in-javascript/
    */

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /*
    LOCAL STORAGE
    */

    useEffect(() => { 
        if (gameId && hostId) {
            setCookie(null, 'gameID', gameId, {
                maxAge: 24 * 60 * 60,
            });
            setCookie(null, 'playerID', hostId, {
                maxAge: 24 * 60 * 60,
            });
        }
    }, [gameId, hostId]);

    /*
    ENABLE GAME
    */

    useEffect(() => {
        if (enabled) {
            createGame();
        }

        async function createGame() {
            setCode("loading");
            await fetch(origin + '/api/new?host=' + name + "&name=" + instructions + "&playerNum=" + players + "&playerSec=" + time)
            .then(res => res.json())
            .then((data) => {
                if (!data.error) {
                    selfId(data.playerID);
                    setId(data.gameID);
                    setCode(data.code);
                    setOpen(true);
                } else {
                    setError(data.error);
                }
            });
        }
    }, [enabled]);

    /*
    SEARCH FOR PLAYERS
    */

    useEffect(() => {
        if (searching) {
            searchPlayers();
        }

        async function searchPlayers () {

            function appendPlayer(player, index) {
                playerList.push(<Avatar key={index} name={player} />);
            }

            let res, data;
            let numPlayers = 0;
            let playerList = [];

            while (searching) {
                // Implement: only allow to check a certain number of times
                res = await fetch(origin + '/api/game?id=' + gameId);
                data = await res.json();
                if (data.players.length > numPlayers) {
                    data.players.forEach(appendPlayer);
                    addPlayers(playerList);
                    playerList = [];
                    numPlayers++;
                } else if (data.enabled) {
                    break;
                }
                await delay(1000);
            }
        }
    }, [searching]);

    /*
    START GAME
    */

    useEffect(() => {

        if (started) {
            setError('');
            enableGame();
        }

        async function enableGame () {
            let res, data;
            res = await fetch(origin + '/api/enable?gameId=' + gameId + '&hostId=' + hostId);
            data = await res.json();
            if (!data.enabled) {
                setStart(false);
                setError("There are no players in this game!");
            } else {
                await delay(1000);
                router.push("/submit");
            }
        }

    }, [started]);

    return (
        <div>
            <style jsx global>{`
                body {
                    text-align: center; 
                    margin-top: 50px; 
                    font-family:'Roboto', sans-serif; 
                    width: 80%;
                    max-width: 1000px;
                    margin-left: auto;
                    margin-right: auto;
                }
            `}</style>
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
                <title>Covalent | New Game</title>
            </Head>
            <div>
                <h1>Instructions</h1>
                <i>In 2 Truths &#38; A Lie, you say (or in this case, type) 3 statements about yourself, 2 of which should be truths and 1 of which should be a lie. However, other players do not know which statement is a lie! Their objective is to guess which one is the lie, and your objective is to make them choose the wrong statement as the lie, so make the truths as interesting as possible!</i>
                <p>As the host, write instructions for your teammates and choose the settings for your game below:</p>
                <div className={styles.settingsForm} id="settings-form">
                    <b><label htmlFor="rounds">Your Name: </label></b>
                    <input className={styles.long} type="text" placeholder="John Doe" onChange={event => setName(event.target.value)} readOnly={enabled}/>
                    <b><label htmlFor="time">Time Limit (30-300s): </label></b>
                    <input className={styles.settingsInput} type="number" min="30" max="300" step="30" defaultValue="30" onChange={event => setTime(event.target.value)} readOnly={enabled}/>
                    <b><label htmlFor="players">Player Count (2-50): </label></b>
                    <input className={styles.settingsInput} type="number" min="2" max="50" defaultValue="2" onChange={event => setPlayers(event.target.value)} readOnly={enabled}/>
                    <br/>
                    <b><label htmlFor="instructions">Instructions For Players:</label></b>
                    <br/>
                    <textarea className={styles.instructions} id="instructions" rows="4" cols="50" placeholder="What do you want to tell your players?" onChange={event => setInstructions(event.target.value)} readOnly={enabled}>
                    </textarea>
                    <br/>
                    <b><label>Code:
                        <input className={styles.settingsInput + " " + styles.code} type="text" value={code || "code"} id="code" readOnly />
                    </label></b>
                    <b><label>Link:
                        <input className={styles.settingsInput + " " + styles.long} type="text" value={"covalent.app/join/" + (code || "code")} id="link" readOnly />
                    </label></b>
                    {searching &&
                    <SimpleButton name="copy link" type="small" onClick={() => { 
                        navigator.clipboard.writeText("covalent.app/join/" + code) 
                        setCopied(true);
                    }}/>
                    }
                    {copied &&
                    <b>Copied!</b>
                    }
                    <br/>
                    {!enabled &&
                        <SimpleButton name="let's go!" type="join" onClick={() => {
                            setError('');
                            if (instructions == '' || name == '' || players > 50 || players < 2 || time > 300 || time < 30) {
                                setError("Please fill in all the fields correctly.")
                            } else {
                                setEnabled(true);
                            }
                        }} />
                    }

                    {searching && !started &&
                        <SimpleButton name="start" type="join" onClick={() => {
                            setStart(true);
                        }}/>
                    }

                    {started && 
                        <SimpleButton name="starting..." type="join" />
                    }   
                    <p>{error}</p>
                </div>
                    {searching &&
                        <div>
                            <hr className={styles.line}/>
                            <h2>Joined</h2>

                            <div id="players" className={styles.center}>  
                                {gamePlayers}
                            </div>
                        </div>
                    }
            </div>
        </div>
    );
}