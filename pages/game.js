import React, { Component } from "react";
import Head from "next/head";
import styles from "../styles/Game.module.css";
import Selection from "../components/Selection";
import Timer from "../components/Timer";
import routingWrapper from "../components/routingWrapper";

// This file is for the 2 Truths & A Lie game
// @Daniel

class Game extends Component {
    render() {
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
                            <p2>PLAYER</p2>
                        </div>
                        <div className={styles.gameTimer}>
                            <Timer></Timer>
                        </div>
                    </div>

                    <div className={styles.gameMain}>
                        <div>
                            <img
                                src="/images/video.jpg"
                                className={styles.videoImg}
                                alt="Video Placeholder"
                            ></img>
                        </div>
                        <Selection
                            player="Player"
                            choice1="Choice 1"
                            choice2="Choice 2"
                            choice3="Choice 3"
                        ></Selection>
                    </div>
                </div>

                <div className={styles.gameSide}>
                    <p>PREVIOUS BONDS</p>
                </div>
            </div>
        );
    }
}

export default routingWrapper(Game);
