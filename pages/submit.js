import React, { useEffect } from "react";
import { useState } from "react";
import { parseCookies } from "nookies";
import Head from "next/head";
import styles from "../styles/Submit.module.css";
import SubmitForm from "../components/SubmitForm";
import Timer from "../components/Timer";
import Error from "../components/Error";
import { GameVideoRecorder } from "../components/VideoLib";

// This file is for the 2 Truths & A Lie game
// @Daniel

const origin = (process.env.NODE_ENV == 'production') ? "https://covalent.app" : "http://localhost:3000";

export default function Submit ({ cookies, error, instructions }) {

    const [video, setVideo] = useState(null);
    const [truth1, setFirstTruth] = useState(null);
    const [truth2, setSecondTruth] = useState(null);
    const [lie, setLie] = useState(null);
    const [submitted, setSubmit] = useState(false);

    useEffect(() => {
        if (submitted) {
            if (video && truth1 && truth2 && lie) {
                addFacts();
            } else {
                setSubmit(false);
            }

            async function addFacts() {
                let res, data, upload, uploadData;
                res = await fetch(origin + '/api/create/facts?gameId=' + cookies.gameID + '&playerId=' + cookies.playerID + '&fact1=' + truth1 + '&fact2=' + truth2 + '&lie=' + lie);
                data = await res.json();

                const formData = new FormData();
                formData.append('file', video);

                upload = await fetch(origin + '/api/file/upload?name=' + cookies.playerID + '.webm', {
                    method: 'POST',
                    body: formData
                });

                // put restraints on the uploads (probably S3 related). figure out delete functions

                uploadData = await upload.json();
                if (data.factsId && uploadData) {
                    // go to game once everyone has submitted their facts
                } else {
                    // something bad happened!  

                }
            }
        }
    },[submitted]);

    /* 
    For some reason, p1 and p2 are not showing up as valid HTML tags in the JS console.
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

                <style jsx global>{`
                    body {
                        width: 100vw;
                        height: 100vh;
                        background: #E1E1E1;
                        overflow: hidden;
                    }
                `}</style>

                {error &&
                    <Error text={error}/>
                }

                {cookies.gameID && instructions &&
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
                                <p1>GET READY!</p1>
                                <p2>PLAYER</p2>
                            </div>
                            <div className={styles.gameTimer}>
                                <Timer></Timer>
                        </div>
                    </div>

                    <div className={styles.gameMain}>
                        <div>
                            <GameVideoRecorder onRecordingComplete={videoBlob => {
                                let videoFile = new File([videoBlob], cookies.playerID + '.webm', {type: 'video/webm',});
                                setVideo(videoFile)
                            }}/>
                        </div>
                        <div>
                            <p>WRITE YOUR <strong>2 TRUTHS &#38; A LIE</strong></p>
                        </div>

                        <SubmitForm 
                            onTruthOneChange={event => setFirstTruth(event.target.value)} 
                            onTruthTwoChange={event => setSecondTruth(event.target.value)} 
                            onLieChange={event => setLie(event.target.value)}
                            onSubmit={() => setSubmit(true)}
                        />
                    </div>
                </div>

                <div className={styles.gameSide}>
                    <div>
                        <p><i>To use Covalent, please allow access to your camera. Covalent cannot take videos without this permission.</i></p>
                        <p><i>Your videos are only stored on our servers for the duration of the game, and are deleted immediately after.</i></p>
                    </div>
                    <divider />
                    <div>
                        <h1>INSTRUCTIONS</h1>
                        <p>In 2 Truths &#38; A Lie, you say (or in this case, type) 3 statements about yourself, 2 of which should be truths and 1 of which should be a lie.</p>
                        <p>However, other players do not know which statement is a lie! Their objective is to guess which one is the lie, and your objective is to make them choose the wrong statement as the lie. So make the truths as interesting as possible!</p>
                        <p>For the video, please follow your host instructions below, and introduce your 2 truths and a lie as well.</p>
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

    let error = null, instructions = null;

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
        } else if (data.game.data.getGame.players.items.filter(obj => { return obj.id === cookies.playerID; })[0].facts) {
            error = "You've already inputted your facts!";
        } else {
            instructions = data.game.data.getGame.name;
        }

    }

    return { 
        props: { 
            cookies, 
            error, 
            instructions 
        } 
    }
}
