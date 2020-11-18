import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'
import { parseCookies } from "nookies";
import styles from "../styles/Results.module.css";
import SimpleButton from "../components/SimpleButton";
import Error from "../components/Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//need to add: interactions w/ backend, icons based on order, stylizing (especially changing line-heights), formatting
//issues: if viewport height is too small, it'll overflow and things will get hidden

const origin = (process.env.NODE_ENV == 'production') ? "https://covalent.app" : "http://localhost:3000";

export default function Results ({ cookies, error, tricksters, guessers, waiting }) {

    const router = useRouter();
    
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
                if (!data.waiting) {
                    router.reload();
                }
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
                <title>Covalent</title>
            </Head>
            {error &&
                <Error text={error}/>
            }
            {waiting && 
                <ErrorWaiting text="Waiting on other players to finish..."/>
            }

            {!error && !waiting &&
            <div className={styles.Results}>
                <style jsx global>{`
                    body {
                        width: 100vw;
                        height: 100vh;
                        background-image: linear-gradient(#80ffdb, #48bfe3);
                        overflow: hidden;
                    }
                `}</style>
                <div className={styles.ResultsBody}>
                    <div className={styles.header}>
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
                    <hr />
                    <div className={styles.trickstersContainer}>
                        <h1>TOP TRICKSTERS</h1>
                        <span className={styles.tricksters}>
                            <div className={styles.player} id={styles.first}>
                                <div>
                                <FontAwesomeIcon
                                    icon="trophy"
                                    className={styles.icon}
                                />
                                <p>{tricksters[0].name}</p>
                                </div>
                                <div className={styles.progressBarBorder}>
                                    <div
                                        className={styles.progressBar}
                                        style={
                                            {
                                                width: tricksters[0].streak + '%'
                                            }
                                        }
                                    ></div>
                                </div>
                            </div>
                            <div
                                className={styles.player}
                                id={styles.second}
                            >
                                <div>
                                <FontAwesomeIcon
                                    icon="medal"
                                    className={styles.icon}
                                />
                                <p>{tricksters[1].name}</p>
                                </div>
                                <div className={styles.progressBarBorder}>
                                    <div
                                        className={styles.progressBar}
                                        style={{ width: tricksters[1].streak + '%' }}
                                    ></div>
                                </div>
                            </div>
                            {tricksters[2] && // accounts for two person games
                            <div className={styles.player} id={styles.third}>
                                <div>
                                <FontAwesomeIcon
                                    icon="medal"
                                    className={styles.icon}
                                />
                                <p>{tricksters[2].name}</p>
                                </div>
                                <div className={styles.progressBarBorder}>
                                    <div
                                        className={styles.progressBar}
                                        style={{ width: tricksters[2].streak + '%' }}
                                    ></div>
                                </div>
                            </div>
                            }
                        </span>
                    </div>
                    <hr />
                    <div className={styles.guessersContainer}>
                        <span className={styles.guessers}>
                            <h1>TOP GUESSERS</h1>
                            <div className={styles.player} id={styles.first}>
                                <div>
                                    <FontAwesomeIcon
                                        icon="trophy"
                                        className={styles.icon}
                                    />
                                    <p>{guessers[0].name} // {guessers[0].streak}</p>
                                    <FontAwesomeIcon
                                        icon="check-circle"
                                        className={styles.icon}
                                    />
                                </div>
                            </div>
                            <div className={styles.player} id={styles.second}>
                                <div>
                                    <FontAwesomeIcon
                                        icon="trophy"
                                        className={styles.icon}
                                    />
                                    <p>{guessers[1].name} // {guessers[1].streak}</p>
                                    <FontAwesomeIcon
                                        icon="check-circle"
                                        className={styles.icon}
                                    />
                                </div>
                            </div>
                            {guessers[2] &&
                            <div className={styles.player} id={styles.third}>
                                <div>
                                    <FontAwesomeIcon
                                        icon="trophy"
                                        className={styles.icon}
                                    />
                                    <p>{guessers[2].name} // {guessers[2].streak}</p>
                                    <FontAwesomeIcon
                                        icon="check-circle"
                                        className={styles.icon}
                                    />
                                </div>
                            </div>
                            }       
                        </span>
                    </div>
                    <hr />
                    <div className={styles.exit}>
                        <div>THANKS FOR PLAYING!</div>
                        <SimpleButton
                            name="EXIT TO MENU"
                            type="host"
                            style={{ padding: "0 1.5vw" }}
                            onClick={() => router.push("/menu")}
                        ></SimpleButton>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const cookies = parseCookies(ctx)

    let res, data, error = null, waiting = null, tricksters = null, guessers = null;

    if (cookies.gameID) {
        res = await fetch(origin + '/api/results?id=' + cookies.gameID);
        data = await res.json();
        tricksters = data.tricksters;
        guessers = data.guessers;
        waiting = data.waiting;
    } else {
        error = "You're not currently in a game."
    }

    return {
        props: {
            cookies,
            error,
            waiting,
            tricksters,
            guessers
        }
    }
}
