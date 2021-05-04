import React, { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import Head from "next/head";
import { useRouter } from 'next/router'
import styles from "../styles/Submit.module.css";
import SubmitForm from "../components/SubmitForm";
import Timer from "../components/Timer";
import Error from "../components/Error";
import { GameVideoRecorder } from "../components/VideoLib";
import { motion } from "framer-motion";

// This file is for the 2 Truths & A Lie game
// @Daniel

const origin = (process.env.NODE_ENV == 'production') ? "https://covalent.app" : "http://localhost:3000";

export default function Submit ({ cookies, error, instructions, time, alreadySubmitted }) {

    const [video, setVideo] = useState(null);
    const [videoOn, setVideoOn] = useState(true);
    const [truth1, setFirstTruth] = useState(null);
    const [truth2, setSecondTruth] = useState(null);
    const [lie, setLie] = useState(null);
    const [submitted, setSubmit] = useState(alreadySubmitted);
    const [enabled, setEnabled] = useState(false);
    const [ready, setRdy] = useState(alreadySubmitted);
    const [badSubmit, setBad] = useState(false);
    const [message, setMsg] = useState('');
    const [numReady, setNumRdy] = useState(0);
    const [players, setPlayers] = useState(1);

    const router = useRouter();

    var badTimer = null;

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function startTimer() {
        badTimer = setTimeout(() => {setBad(false);}, 5000);
    }

    useEffect(() => {
        clearTimeout(badTimer);
        startTimer();

        return () => clearTimeout(badTimer);
    },[badSubmit]);

    useEffect(() => {
        if (video && truth1 && truth2 && lie) {
            setBad(false);
        }
        setMsg('');
        if(!video) {
            if(!truth1 || !truth2) {
                if(!lie)
                    setMsg('Please set your video, truths, and lie.');
                else
                    setMsg('Please set your video and truths.');
            }
            else if (!lie)
                setMsg('Please set your video and lie.');
            else
                setMsg('Please set your video.');
        }
        else {
            if(!truth1 || !truth2) {
                if(!lie)
                    setMsg('Please set your truths and lie.');
                else
                    setMsg('Please set your truths.');
            }
            else
                setMsg('Please set your lie.');
        }
    },[video, truth1, truth2, lie]);


    useEffect(() => {
        if (submitted) {
            if (((video || !videoOn) && truth1 && truth2 && lie) || alreadySubmitted) {
                setBad(false);
                setEnabled(true);
                addFacts();
            } else {
                setSubmit(false);
                setBad(true);
            }

            async function addFacts() {
                let res, data;
                if (!alreadySubmitted) {
                    res = await fetch(origin + '/api/submit?gameId=' + cookies.gameID + '&playerId=' + cookies.playerID + '&fact1=' + truth1 + '&fact2=' + truth2 + '&lie=' + lie + '&videoOn=' + videoOn);
                    data = await res.json();

                    if (!data.error && data.submit && data.video) {
                        res = await fetch(data.video, {
                            method: 'PUT',
                            body: video,
                        });
                        refresh();
                    } else {
                        console.log(data.error);
                        // Implement: SHOW DATA.ERROR
                        setEnabled(false);
                        setSubmit(false);
                    }
                } else {
                    refresh();
                }

                async function refresh() {
                    while (submitted) {
                        res = await fetch(origin + '/api/game?id=' + cookies.gameID)
                        data = await res.json();
                        setPlayers(data.players.length);
                        if(data.numPlayersReady > numReady + 1) {
                            setNumRdy(data.numPlayersReady - 1);
                        }
                        if (data.ready) {
                            await delay(2000);
                            router.push("/game");
                            break;
                        }
                        if(!ready)
                            setRdy(true);
                        await delay(2000);
                    }
                }
            }
        }
    },[submitted]);

    /* 
    p1 and p2 are not showing up as valid HTML tags in the JS console.
    This is a reminder to fix that.
    */

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

                {error &&
                    <Error text={error}/>
                }

                {!cookies.gameID &&
                    <Error text="You're not currently in a game." />
                }

                {cookies.gameID && instructions &&
                <div>
                    <style jsx global>{`
                    body {
                        width: 100vw;
                        height: 100vh;
                        background: #E1E1E1;
                        overflow: hidden;
                    }
                    `}</style>
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
                                <p1>GET READY!</p1>
                                <p2>PLAYER</p2>
                            </div>
                            <div className={styles.gameTimer}>
                                <Timer time={time} disabled/>
                        </div>
                    </div>

                    <div className={styles.gameMain}>
                        {!ready ? 
                        <div>
                            <div>
                                <GameVideoRecorder isOn={videoOn} onRecordingComplete={videoBlob => {
                                    let videoFile = new File([videoBlob], "Player Video", {type: 'video/webm',});
                                    setVideo(videoFile)
                                }}/>
                            </div>
                            <button onClick={() => setVideoOn(!videoOn)}>VIDEO ON</button>
                            <div>
                                <p>WRITE YOUR <strong>2 TRUTHS &#38; A LIE</strong></p>
                            </div>
                        </div> 
                            : 
                        <div className={styles.submittedLoading}>
                            <img src="/images/loading.gif" alt="Logo"/>
                        </div>
                        }
                        <SubmitForm 
                            onTruthOneChange={event => setFirstTruth(event.target.value)} 
                            onTruthTwoChange={event => setSecondTruth(event.target.value)} 
                            onLieChange={event => setLie(event.target.value)}
                            onSubmit={() => setSubmit(true)}
                            submitting={enabled}
                            submitted={ready}
                        />
                        {badSubmit &&
                        <p>{message}</p>}
                        {ready &&
                            <div className={styles.submitBar}>
                                <div className={styles.progressBarBorder}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: numReady * 100 / players + '%',
                                            transition: {
                                                duration: 1,
                                            }
                                        }}
                                        className={styles.progressBar}
                                    />
                                    <span>{numReady}/{players}</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className={styles.gameSide}>
                    <div>
                        <p><i>To use Covalent, please allow access to your camera. Covalent cannot take videos without your permission.</i></p>
                        <p><i>Your privacy is important to us: Covalent only stores videos for the duration of the game.</i></p>
                    </div>
                    <divider />
                    <div>
                        <h1>INSTRUCTIONS</h1>
                        <p>Type 3 statements about yourself: 2 of these statements should be facts, or “truths,” and the 3rd statement should be a lie.</p>
                        <p>Other players will see your 3 statements in a random order. <b>Their objective</b> is to guess which statement is the lie. <b>Your objective</b> is to trick others into choosing one of your truths as the lie.</p>
                        <p><i><b>Tip:</b> Make your statements as interesting as possible!</i></p>
                        <p><b>Please introduce yourself in the video!</b></p>
                    </div>
                    <divider />
                    <div>
                        <h1>FROM YOUR HOST</h1>
                        <p>{instructions}</p>
                    </div>
                </div>
            </div>
            }
        </div>
        );
}

export async function getServerSideProps(ctx) {
    const cookies = parseCookies(ctx)

    let error = null, instructions = null, time = null, alreadySubmitted = false;

    if (cookies.gameID) {
        let res, data;
        try {
            if (cookies.playerID) {
                res = await fetch(origin + '/api/game?id=' + cookies.gameID + "&player=" + cookies.playerID);
            } else {
                res = await fetch(origin + '/api/game?id=' + cookies.gameID);
            }
            data = await res.json();
        } catch (err) {
            console.log(err);
        }

        if (!data.id) {
            error = "Game not found.";
        } else if (!data.enabled) {
            error = "Your host hasn't enabled this game yet.";
        } else {
            instructions = data.name;
            time = data.seconds;
            alreadySubmitted = data.playerSubmittedFacts;
        }

    }

    return { 
        props: { 
            cookies, 
            error, 
            instructions,
            time,
            alreadySubmitted
        } 
    }
}
