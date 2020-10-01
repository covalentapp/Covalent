import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from 'next/router'
import Head from "next/head";
import styles from "../styles/Game.module.css";
import PreviousBonds from "../components/PreviousBonds";
import Selection from "../components/Selection";
import Timer from "../components/Timer";
import Error from "../components/Error";
import { VideoPlayback } from "../components/VideoLib";

// This file is for the 2 Truths & A Lie game
// @Daniel

const origin = (process.env.NODE_ENV == 'production') ? "https://covalent.app" : "http://localhost:3000";

export default function Game ({ cookies, error, facts, time }) {

    const [currentFact, incrementFacts] = useState(0);
    const [factSet, setFacts] = useState(null);
    const [fact1, setFact1] = useState({});
    const [fact2, setFact2] = useState({});
    const [fact3, setFact3] = useState({});
    const [name, setName] = useState('');
    const [video, setVideo] = useState(null);
    const [gameTime, setTime] = useState(0);
    const [submitted, setSubmitted] = useState(0);
    const [selected, setSelected] = useState(false);
    const [selectedFact, selectFact] = useState(null);
    const [results, enableResults] = useState(false);
    const [previousID, setPreviousId] = useState(cookies.previousID);
    const [connections, setConnections] = useState([]);
    const [internalTime, setInternalTime] = useState(0);
    const [disabledTimer, disableTimer] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (facts) {
            if (currentFact < facts.length) {
                setSelected(null);
                selectFact(null); 
                setFact1({});
                setFact2({});
                setFact3({});
                setName('');
                setVideo(null);
                enableResults(false);
                newFacts();
            } else {
                router.push("/results");
            }
        }
    
        async function newFacts() {

            let playerId;

            if (facts[currentFact].player.id == cookies.playerID) {
                incrementFacts(currentFact + 1);
            } else {
                await fetch(origin + '/api/get/facts?factsId=' + facts[currentFact].id)
                .then(response => response.json())
                .then(data => {
                    setFacts(shuffle(data.facts));
                    setName(data.name);
                    playerId = data.playerId;
                });

                await fetch(origin + '/api/file/get?name=' + playerId + '.webm')
                .then(response => response.json())
                .then(data => {
                    setVideo(
                        URL.createObjectURL(
                            new File([new Uint8Array(data.video.data)],
                            facts[currentFact].player.id + '.webm',
                            {type: 'video/webm'})
                        )
                    );
                });
            }
        }

        /* 
        Shuffle those facts to the beat
        https://stackoverflow.com/a/6274381
        */

        function shuffle(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        }

    },[currentFact]);

    useEffect(() => {
        if (factSet) {
            setFact1(factSet[0]);
            setFact2(factSet[1]);
            setFact3(factSet[2]);
            setTime(time);
            disableTimer(false);
        }
    },[factSet])

    useEffect(() => {
        if (results) {
            disableTimer(true);
            setSubmitted(submitted + 1);
            addPrevious();
        }

        async function addPrevious() {
            let res, data;
            if (previousID) {
                res = await fetch(origin + '/api/create/previous?previousId=' + previousID + '&factsId=' + facts[currentFact].id + '&correct=' + !selectedFact.valid);
                data = await res.json();
            } else {
                res = await fetch(origin + '/api/create/previous?gameId=' + cookies.gameID + '&playerId=' + cookies.playerID + '&factsId=' + facts[currentFact].id + '&correct=' + !selectedFact.valid);
                data = await res.json();
                setPreviousId(data.previousId);
                setCookie(null, 'previousID', data.previousId, {
                    maxAge: 24 * 60 * 60,
                });
            }

            let newConnection = {
                id: facts[currentFact].id,
                facts: factSet,
                name: name,
                correct: !selectedFact.valid
            }

            setConnections(connections => [...connections, newConnection]);
        }
    }, [results])

    useEffect(() => {
        if (!internalTime && factSet) {
            setSelected(0);
            selectFact({valid: false});
            enableResults(true);
        }
    }, [internalTime])

        return (
  
            <div className={styles.Game}>
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta name="theme-color" content="#000000" />
                    <meta
                        name="description"
                        content="Remote team-building made super simple"
                    />
                    <link rel="apple-touch-icon" href="/images/logo192.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="icon" href="/favicon.ico" />
                    <title>Covalent</title>
                </Head>

                <style jsx global>{`
                    body {
                        width: 100vw;
                        height: 100vh;
                        background: #E1E1E1;
                        overflow: hidden;
                    }
                `}</style>

                {error &&
                    <Error text={error} />
                }
                
                
                {!cookies.gameID &&
                    <Error text="You're not currently in a game." />
                }

                {cookies.gameID && facts &&
                <div>
                    <div className={styles.gameBody}>

                        <div className={styles.gameBar}>
                            <div className={styles.gameLogo}>
                                <img
                                    src="/images/logo.svg"
                                    className={styles.logoImg}
                                    alt="Covalent Logo"
                                ></img>
                                <div className={styles.logoText}>
                                    <p1>COVALENT</p1>
                                    <p2>2 TRUTHS &#38; A LIE</p2>
                                </div>
                            </div>
                            <div className={styles.centerText}>
                                <p1>NOW BONDING WITH</p1>
                                <p2>{name || "Loading..."}</p2>
                            </div>
                            <div className={styles.gameTimer}>
                                <Timer time={gameTime} disabled={disabledTimer} submitted={submitted} parentTime={setInternalTime} />
                            </div>
                        </div>

                        <div className={styles.gameMain}>
                            <div>
                                <VideoPlayback video={video}/>                         
                            </div>
                            <Selection
                                player={name || "Loading..."}
                                choice1={fact1.name || "Loading..."}
                                choice2={fact2.name || "Loading..."}
                                choice3={fact3.name || "Loading..."}
                                choice1valid={fact1.valid}
                                choice2valid={fact2.valid}
                                choice3valid={fact3.valid}
                                selected={selected}
                                onClick1={() => {
                                    selectFact(fact1);
                                    setSelected(1);
                                }}
                                onClick2={() => {
                                    selectFact(fact2);
                                    setSelected(2);
                                }}
                                onClick3={() => {
                                    selectFact(fact3);
                                    setSelected(3);
                                }}
                                onSubmit={() => {
                                    if (selected) {
                                        enableResults(true);
                                    }
                                }}
                                continue={() => {
                                    incrementFacts(currentFact + 1); 
                                }}
                                results={results}
                            ></Selection>
                        </div>
                    </div>

                    <div className={styles.gameSide}>
                        <div className={styles.scoreBox}>
                            <p>{connections.length || "0"}</p>
                            <FontAwesomeIcon icon="check-circle" className={styles.scoreIcon} />
                        </div>
                        <PreviousBonds connections={connections}/>
                    </div>
                </div>
                }               
            </div>
                    
            );
}

// IMPLEMENT: CHECK IF A PREVIOUS EXISTS
// ALSO: IF PREVIOUS EXISTS, LOAD UP TO THAT POINT

export async function getServerSideProps(ctx) {
    const cookies = parseCookies(ctx)

    let error = null, facts = null, time = null;

    if (cookies.gameID) {
        let res, data;
        try {
            res = await fetch(origin + '/api/get/game?gameId=' + cookies.gameID);
            data = await res.json();
        } catch (err) {
            console.log(err);
        }

        if (!data.game) {
            error = "Game not found.";
        } else if (!data.game.data.getGame.enabled) {
            error = "Your host hasn't enabled this game yet.";
        } else if (!data.game.data.getGame.facts.items.filter(obj => { return obj.player.id === cookies.playerID; }).length) {
            error = "You haven't inputted your facts yet.";
        } else if (data.game.data.getGame.facts.items.length < data.game.data.getGame.players.items.length) { 
            error = "Not everyone has submitted their facts yet.";
        } else {
            facts = data.game.data.getGame.facts.items;
            time = data.game.data.getGame.playerSeconds;
        }

    }

    return {
        props: {
            cookies,
            error,
            facts,
            time
        }
    }
}
