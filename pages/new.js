import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import SimpleButton from '../components/SimpleButton';
import Avatar from '../components/Avatar';
import styles from '../styles/Settings.module.css';

import absoluteUrl from 'next-absolute-url';

/*This file is for the Settings component for Covalent
@Catherine*/

export default function Settings({ req, code }) {

    /*
    I think I'm breaking some javascript rules here with the code I've written below.

    This note is a reminder to me (Arek) to go back and fix this eventually.

    Still have to add:
    - Player can't join until game is enabled
    - Can't start game if there's only one player (host)
    - Start the actual game
    */


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

    let gameStart = false;

    /*
    ENABLE GAME
    */

    useEffect(() => {
        if (enabled) {
            createGame();
        }

        async function createGame() {
            let host, game;
            const { origin } = absoluteUrl(req);

            await fetch(origin + '/api/create/player?playerName=' + name)
            .then(res => res.json())
            .then((data) => host = data.playerId);

            await fetch(origin + '/api/create/game?code=' + code + "&gameHost=" + host + "&gameName=" + instructions + "&playerNum=" + players + "&playerSec=" + time)
            .then(res => res.json())
            .then((data) => game = data.gameId);

            console.log(game); // REMOVE THIS LATER

            selfId(host); // game ID
            setId(game); // host ID
            setOpen(true);
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
                /* 
                Slow down succeeding API calls to check for new players

                https://www.pentarem.com/blog/how-to-use-settimeout-with-async-await-in-javascript/
                */

            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            function appendPlayer(player, index) {
                if (player.id != hostId) {
                    playerList.push(<Avatar key={index} name={player.name} />);
                }
            }

            let res, data;
            let numPlayers = 0;
            let playerList = [];

            while (!gameStart) {
                res = await fetch(origin + '/api/get/game?gameId=' + gameId);
                data = await res.json();
                if (data.game.data.getGame.players.items.length > numPlayers + 1) {
                    data.game.data.getGame.players.items.forEach(appendPlayer);
                    addPlayers(playerList);
                    playerList = [];
                    numPlayers++;
                }  
                await delay(2000);
                console.log(gameStart); // REMOVE THIS LATER
            }
        }
    }, [searching]);

    /*
    START GAME
    */

    useEffect(() => {
        if (started) {
            console.log("This was called"); // REMOVE THIS LATER
            setOpen(false);
            gameStart = true;
        }
    }, [started]);

    /*
    Possible flow if I can't get the loop to stop: just do all the start stuff and redirect to the game page
    */
    

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
            <h1>Instructions</h1>
            <i>In 2 Truths &#38; A Lie, you say (or in this case, type) 3 statements about yourself, 2 of which should be truths and 1 of which should be a lie. However, other players do not know which statement is a lie! Their objective is to guess which one is the lie, and your objective is to make them choose the wrong statement as the lie, so make the truths as interesting as possible!</i>
            <p>As the host, write instructions for your teammates and choose the settings for your game below:</p>
            <div className={styles.settingsForm} id="settings-form">
                <b><label htmlFor="rounds">Your Name: </label></b>
                <input className={styles.long} type="text" placeholder="John Doe" onChange={event => setName(event.target.value)}/>
                <b><label htmlFor="time">Time Limit (30-300s): </label></b>
                <input className={styles.settingsInput} type="number" min="30" max="300" step="30" defaultValue="30" onChange={event => setTime(event.target.value)}/>
                <b><label htmlFor="players">Player Count (2-50): </label></b>
                <input className={styles.settingsInput} type="number" min="2" max="50" defaultValue="2" onChange={event => setPlayers(event.target.value)}/>
                <br></br>
                <b><label htmlFor="instructions">Instructions For Players:</label></b>
                <br></br>
                <textarea className={styles.instructions} id="instructions" rows="4" cols="50" placeholder="What do you want to tell your players?" onChange={event => setInstructions(event.target.value)}>
                </textarea>
                <br></br>
                <b><label>Code:
                    <input className={styles.settingsInput + " " + styles.code} type="text" value={code} id="code" readOnly />
                </label></b>
                <b><label>Link:
                     <input className={styles.settingsInput + " " + styles.long} type="text" value={"covalent.app/join/" + code} id="link" readOnly />
                </label></b>
                <button className={styles.settingsButton} onClick={() => { navigator.clipboard.writeText("covalent.app/join/" + code) }}>COPY LINK</button>
                <br></br>
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

                {enabled && 
                <SimpleButton name="start" type="join" onClick={() => {
                    setStart(true);
                }}/>
                // Enable game when button is pressed
                }
                <p>{error}</p>
            </div>
                {enabled &&
                <div>
                <hr className={styles.line}/>
                <h2>Joined</h2>

                <div id="players" className={styles.center}>  
                {gamePlayers}
                </div>
                </div>
                }
        </div>
    );
}

/*
getServerSideProps, new game: makes a random ID at page request and checks API to see if a game with that ID already exists.
If it doesn't, it gives the page the new code as a property and adds it to the page
*/

export async function getServerSideProps({ req }) {
    let code, res, data;
    const { origin } = absoluteUrl(req);
    do {
        code = makeid(6);
        res = await fetch(origin + '/api/get/game?code=' + code);
        data = await res.json();
    } while (data.game.data.gameByCode.items.length != 0);
    return {
        props: {
            code,
        },
    }
}

/*
So random
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