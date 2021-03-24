import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Game.module.css";
import PreviousBonds from "../components/PreviousBonds";
import Selection from "../components/Selection";
import Timer from "../components/Timer";
import Error from "../components/Error";
import { VideoPlayback } from "../components/VideoLib";

// This file is for the 2 Truths & A Lie game
// @Daniel

const origin =
    process.env.NODE_ENV == "production"
        ? "https://covalent.app"
        : "http://localhost:3000";

export default function Game({ cookies, error, time }) {
    const [currentFact, incrementFacts] = useState(0);
    const [factsId, setFacts] = useState(null);
    const [fact1, setFact1] = useState({});
    const [fact2, setFact2] = useState({});
    const [fact3, setFact3] = useState({});
    const [name, setName] = useState("");
    const [video, setVideo] = useState(null);
    const [submitted, setSubmitted] = useState(0);
    const [selected, setSelected] = useState(false);
    const [selectedFact, selectFact] = useState(null);
    const [results, enableResults] = useState(false);
    const [resultSet, setResults] = useState([]);
    const [connections, setConnections] = useState([]);
    const [correctConnect, setCorrectConnect] = useState(0);
    const [internalTime, setInternalTime] = useState(0);
    const [disabledTimer, disableTimer] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (!error) {
            // Reset all state data
            setSelected(null);
            selectFact(null);
            setFact1({});
            setFact2({});
            setFact3({});
            setName("");
            setVideo(null);
            enableResults(false);
            setSubmitted(false);
            setResults([]);
            newFacts();
        }

        async function newFacts() {
            await fetch(
                origin +
                    "/api/getFacts?gameId=" +
                    cookies.gameID +
                    "&playerId=" +
                    cookies.playerID
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.end) {
                        router.push("/results");
                    } else {
                        // Add new data
                        setFacts(data.id);
                        setFact1(data.fact1);
                        setFact2(data.fact2);
                        setFact3(data.fact3);
                        setName(data.name);
                        setVideo(data.video);
                        disableTimer(false);
                    }
                });
        }
    }, [currentFact]);

    useEffect(() => {
        if (results) {
            disableTimer(true);
            setSubmitted(true);
            submit();
        }

        async function submit() {
            await fetch(
                origin +
                    "/api/postFacts?gameId=" +
                    cookies.gameID +
                    "&playerId=" +
                    cookies.playerID +
                    "&factsId=" +
                    factsId +
                    "&factId=" +
                    selectedFact.id
            )
                .then((response) => response.json())
                .then((data) => {
                    let newConnection = {
                        id: factsId,
                        facts: data.facts,
                        name: name,
                        correct: data.correct,
                        chosenId: data.chosen,
                    };
                    setResults(data.facts);
                    if (data.correct) {
                        setCorrectConnect(correctConnect + 1);
                    }
                    setConnections((connections) => [
                        ...connections,
                        newConnection,
                    ]);
                });
        }
    }, [results]);

    useEffect(() => {
        if (!internalTime && factsId) {
            selectFact({ id: "" });
            setSelected(null);
            enableResults(true);
        }
    }, [internalTime]);

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

            {error && <Error text={error} />}

            {cookies.gameID && !error && (
                <div>
                    <style jsx global>{`
                        body {
                            width: 100vw;
                            height: 100vh;
                            background: #e1e1e1;
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
                                <p1>NOW BONDING WITH</p1>
                                <p2>{name || "Loading..."}</p2>
                            </div>
                            <div className={styles.gameTimer}>
                                <Timer
                                    time={time}
                                    disabled={disabledTimer}
                                    parentTime={setInternalTime}
                                />
                            </div>
                        </div>

                        <div className={styles.gameMain}>
                            <div>
                                <VideoPlayback video={video} />
                            </div>
                            {!fact1.name ? (
                                <div>
                                    <h1>Loading...</h1>
                                </div>
                            ) : (
                                <Selection
                                    player={name}
                                    choice1={fact1.name}
                                    choice2={fact2.name}
                                    choice3={fact3.name}
                                    choice1valid={
                                        resultSet.length != 0
                                            ? resultSet.filter((fact) => {
                                                  return fact.id == fact1.id;
                                              })[0].valid
                                            : null
                                    }
                                    choice2valid={
                                        resultSet.length != 0
                                            ? resultSet.filter((fact) => {
                                                  return fact.id == fact2.id;
                                              })[0].valid
                                            : null
                                    }
                                    choice3valid={
                                        resultSet.length != 0
                                            ? resultSet.filter((fact) => {
                                                  return fact.id == fact3.id;
                                              })[0].valid
                                            : null
                                    }
                                    selected={selected}
                                    submitted={submitted}
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
                                    results={resultSet.length != 0}
                                ></Selection>
                            )}
                        </div>
                    </div>

                    <div className={styles.gameSide}>
                        <div className={styles.scoreBox}>
                            <p>{correctConnect}</p>
                            <FontAwesomeIcon
                                icon="check-circle"
                                className={styles.scoreIcon}
                            />
                        </div>
                        <div className={styles.gameSideHeader}>
                            <div className={styles.prevText}>
                                <p>PREVIOUS BONDS</p>
                            </div>
                            <div className={styles.gameSideBondDivider}></div>
                        </div>
                        <div className={styles.gameSidePrevious}>
                            <PreviousBonds connections={connections} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// IMPLEMENT: CHECK IF A PREVIOUS EXISTS
// ALSO: IF PREVIOUS EXISTS, LOAD UP TO THAT POINT

export async function getServerSideProps(ctx) {
    const cookies = parseCookies(ctx);

    let error = null,
        time = null;

    if (cookies.gameID) {
        let res, data;
        try {
            res = await fetch(
                origin +
                    "/api/play?gameId=" +
                    cookies.gameID +
                    "&playerId=" +
                    cookies.playerID
            );
            data = await res.json();
        } catch (err) {
            console.log(err);
        }

        if (!data.start) {
            error = data.error;
        } else {
            time = data.time;
        }
    } else {
        error = "You're not currently in a game.";
    }

    return {
        props: {
            cookies,
            error,
            time,
        },
    };
}
