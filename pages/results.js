import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'
import { parseCookies } from "nookies";
import styles from "../styles/Results.module.css";
import Error from "../components/Error";
import ErrorWaiting from "../components/ErrorWaiting";
import SimpleButton from "../components/SimpleButton";
import ResultsBonds from "../components/results/resultsbonds";
import ResultsMain from "../components/results/resultsmain";
import { motion } from "framer-motion";

const origin = (process.env.NODE_ENV == 'production') ? "https://covalent.app" : "http://localhost:3000";

export default function Results ({ cookies, error, tricksters, guessers, waiting, list, ownFacts, ownName }) {

    const router = useRouter();
    const [numReady, setNumRdy] = useState(0);
    const [players, setPlayers] = useState(1);
    const [ready, setRdy] = useState(false);
    const [bonds, setBonds] = useState(true);
    
    //test functions below
    /*
    function getTrickster(i) {
        let name, streak;
        if(i == 1) {
            name = "Arek Der-Sarkissian";
            streak = "100";
        }
        else if(i == 2) {
            name = "Michael Shi";
            streak = "75";
        }
        else {
            name = "Daniel Dai";
            streak = "50";
        }

        return {
            name,
            streak
        };
    }

    function getGuesser(i) {
        let name, streak;
        if(i == 1) {
            name = "Arek Der-Sarkissian";
            streak = "4";
        }
        else if(i == 2) {
            name = "Michael Shi";
            streak = "3";
        }
        else {
            name = "Daniel Dai";
            streak = "3";
        }

        return {
            name,
            streak
        };
    }

    var tricksters = ["", "", ""]
    var guessers = ["", "", ""]

    for(let i = 1; i < 4; i++) {
        tricksters[i-1] = getTrickster(i);
        guessers[i-1] = getGuesser(i);
    }
    */
    //end test functions

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        if (waiting) {
            reload();
        }

        async function reload() {
            let res, data;
            while (waiting) {
                res = await fetch(origin + '/api/results?id=' + cookies.gameID);
                data = await res.json();
                setPlayers(data.numPlayers - 1);
                if(data.numPlayersDone > numReady + 1) {
                    setNumRdy(data.numPlayersDone - 1);
                }
                if (!data.waiting) {
                    router.reload();
                }
                if(!ready)
                    setRdy(true);
                await delay(2000);
            }
        }
    }, [waiting])

    return (
    <div>
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
                <title>Covalent | Results</title>
            </Head>
            <style jsx global>{`
                body {
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                }
            `}</style>

            {error &&
                <Error text={error}/>
            }
            {waiting && ready &&
                <div className={styles.waitingOuter}>
                    <div className={styles.waitingContainer}>
                        <div className={styles.waiting}>
                            <ErrorWaiting text="Waiting on other players to finish..." />
                        </div>
                        <div className={styles.waitingBar}>
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
                    </div>
                </div>
            }
            {!error && !waiting &&
                <div className={styles.ResultsContainer}>
                    <div className={styles.Results}>
                        <div className={styles.header}>
                            <div className={styles.logo}>
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
                            <div className={styles.screenSwitch}>
                                <button className={styles.screenSwitchButton} onClick={() => {setBonds(!bonds)}}>
                                    {bonds ? 'Switch to Results' : 'Switch to All Bonds'}
                                </button>
                            </div>
                        </div>
                        <hr />
                        {bonds ?
                            <ResultsBonds list={list} ownFacts={ownFacts}/>
                        :
                            <ResultsMain tricksters={tricksters} guessers={guessers} />
                        }
                        <hr />
                        <div className={styles.exit}>
                            <div>THANKS FOR PLAYING!</div>
                            <div className={styles.exitButtons}>
                                <SimpleButton
                                    name="EXIT TO MENU"
                                    type="host"
                                    style={{ padding: "0 1.5vw" }}
                                    onClick={() => router.push("/menu")}
                                ></SimpleButton>
                                <SimpleButton
                                    name="FEEDBACK"
                                    type="purple"
                                    style={{ padding: "0 1.5vw" }}
                                    onClick={() => { 
                                        window.open("https://form.typeform.com/to/kFozUj4m"); }}
                                ></SimpleButton>
                            </div>
                        </div>
                    </div>
                </div>
            }
    </div>
    );
}

export async function getServerSideProps(ctx) {
    const cookies = parseCookies(ctx)

    let res, data, error = null, waiting = null, tricksters = null, guessers = null, list = null, ownFacts = null, ownName = null;

    if (cookies.gameID && cookies.playerID) {
        res = await fetch(origin + '/api/results?id=' + cookies.gameID + '&playerId=' + cookies.playerID);
        data = await res.json();
        tricksters = data.tricksters;
        guessers = data.guessers;
        waiting = data.waiting;
        list = data.factSets;
        ownFacts = data.ownFacts;
        ownName = data.ownName;
    } else {
        error = "You're not currently in a game."
    }

    return {
        props: {
            cookies,
            error,
            waiting,
            tricksters,
            guessers,
            list,
            ownFacts,
            ownName,
        }
    }
}
