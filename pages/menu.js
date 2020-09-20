import React, { Component } from "react";
import Head from "next/head";
import styles from "../styles/Menu.module.css";
import SimpleButton from "../components/SimpleButton";
import JoinOptions from "../components/JoinOptions";
import routingWrapper from "../components/routingWrapper";

//This file is for the Game Selection/Menu/Homepage for Covalent
//@Michael

class Menu extends Component {
    constructor(props) {
        super(props);
        this.join = React.createRef();
        this.host = React.createRef();
        this.overlay = React.createRef();
        this.handleHostClick = this.handleHostClick.bind(this);
    }

    handleJoinClick = (event) => {
        this.join.current.handleSubmit(event); //change to interact with backend to bring to join-instructions page
    };

    handleHostClick = (e) => {
        e.preventDefault();
        this.props.router.push("menu/host");
    };

    render() {
        return (
            <div className={styles.Menu}>
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
                <div className={styles.MenuBody}>
                    {/*<div className={styles.white}>*/}
                    <img
                        src="/images/logo.svg"
                        className={styles.logoImg}
                        alt="Covalent Logo"
                    ></img>
                    <p className={styles.logoText}>COVALENT</p>
                    {/*</div> div no longer needed without join button animation*/}
                    <div className={styles.MenuButtons}>
                        <div className={styles.joinOptions}>
                            <JoinOptions ref={this.join} />
                        </div>
                        <div className={styles.defaultButton}>
                            <SimpleButton
                                name="JOIN"
                                type="join"
                            ></SimpleButton>
                        </div>
                        <div className={styles.defaultButton}>
                            <SimpleButton
                                name="HOST"
                                type="host"
                                onClick={this.handleHostClick}
                            ></SimpleButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default routingWrapper(Menu);