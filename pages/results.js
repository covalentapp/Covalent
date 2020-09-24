import React, { Component } from "react";
import Head from "next/head";
import styles from "../styles/Results.module.css";
import SimpleButton from "../components/SimpleButton";
import routingWrapper from "../components/routingWrapper";

//need to add: interactions w/ backend, icons based on order, stylizing (especially changing line-heights), formatting
//issues: if viewport height is too small, it'll overflow and things will get hidden

class Results extends Component {
    render() {
        return (
            <div className={styles.Results}>
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
                        <div className={styles.tricksters}>
                            <div className={styles.trickster} id={styles.first}>
                                <p>arek d.</p> {/*replace w/ variables*/}
                                <div className={styles.progressBarBorder}>
                                    <div
                                        className={styles.progressBar}
                                        style={
                                            {
                                                width: "20%",
                                            } /*set these to some variable*/
                                        }
                                    ></div>
                                </div>
                            </div>
                            <div className={styles.trickster} id={styles.second}>
                                <p>hi</p>
                                <div className={styles.progressBarBorder}>
                                    <div
                                        className={styles.progressBar}
                                        style={{ width: "20%" }}
                                    ></div>
                                </div>
                            </div>
                            <div className={styles.trickster} id={styles.third}>
                                <p>hi</p>
                                <div className={styles.progressBarBorder}>
                                    <div
                                        className={styles.progressBar}
                                        style={{ width: "20%" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.guessersContainer}>
                        <div className={styles.guessers}>
                        <h1>TOP GUESSERS</h1>
                        <div className={styles.guesser} id={styles.first}>
                            <p>hi</p>
                        </div>
                        <div className={styles.guesser} id={styles.second}>
                            <p>hi</p>
                        </div>
                        <div className={styles.guesser} id={styles.third}>
                            <p>hi</p>
                        </div>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.exit}>
                        <div>THANKS FOR PLAYING!</div>
                        <SimpleButton name="EXIT TO MENU" type="host" autoWidth={true}></SimpleButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default routingWrapper(Results);
