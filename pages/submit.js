import React, { Component } from "react";
import Head from "next/head";
import styles from "../styles/Submit.module.css";
import Selection from "../components/Selection";
import SubmitForm from "../components/SubmitForm";
import Timer from "../components/Timer";
import routingWrapper from "../components/routingWrapper";

// This file is for the 2 Truths & A Lie game
// @Daniel

class Submit extends Component {
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
                            <p1>GET READY!</p1>
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
                        <div>
                            <p>WRITE YOUR <strong>2 TRUTHS &#38; A LIE</strong></p>
                        </div>

                        <SubmitForm></SubmitForm>
                    </div>
                </div>

                <div className={styles.gameSide}>
                    <p>hello</p>
                    <p>hello</p>
                    <p>hello</p>
                    {/* <div className={styles.permissions}>
                        <p2>To use Covalent, please allow access to your camera. Covalent cannot take videos without this permission.</p2>
                        <p2>Your videos are only stored on our servers for the duration of the game, and are deleted immediately after.</p2>
                    </div>
                    <divider></divider>
                    <div className={styles.instructions}>
                        <h1>INSTRUCTIONS</h1>
                        <p>In 2 Truths &#38; A Lie, you say (or in this case, type) 3 statements about yourself, 2 of which should be truths and 1 of which should be a lie.</p>
                        <p>However, other players do not know which statement is a lie! Their objective is to guess which one is the lie, and your objective is to make them choose the wrong statement as the lie. So make the truths as interesting as possible!</p>
                        <p>For the video, please follow your host instructions below, and introduce your 2 truths and a lie as well.</p>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default routingWrapper(Submit);
