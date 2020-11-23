import React, { useState, Component } from "react";
import Head from "next/head";
import styles from "../styles/GamesMenu.module.css";
import { motion } from "framer-motion";
import routingWrapper from "./routingWrapper";

//remaining tasks for GamesMenu: add in the information + formatting for each of the individual games
//+ one issue: the games currently go OVER the "transparent" div - i want it to go under

class HostMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: true };
    }

    changePage = (e, destination) => {
        e.preventDefault();
        this.setState({ isOpen: false }); // triggers the exit animation
        setTimeout(() => {
            this.props.close();
            this.props.router.push(destination);
        }, 250);
    };

    getGamesNumber() {
        return document.body.getElementsByClassName("game").length;
    }

    handleRouteChange = () => {
        if (window.location.href != origin + "/menu/?host") {
            this.setState({ isOpen: false });
            setTimeout(() => {
                this.props.close();
            }, 250);
        }
    };

    componentDidMount() {
        this.props.router.events.on(
            "routeChangeComplete",
            this.handleRouteChange
        );
    }

    componentWillUnmount() {
        this.props.router.events.off(
            "routeChangeComplete",
            this.handleRouteChange
        );
    }

    render() {
        return (
            <div className={styles.gamesMenuContainer}>
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
                    <title>Covalent | Select Game</title>
                </Head>
                {/* Transition for overlay */}
                <motion.div
                    initial="initial"
                    animate={this.state.isOpen ? "enter" : "exit"}
                    exit="exit"
                    variants={{
                        initial: {
                            opacity: 0,
                        },
                        enter: {
                            opacity: 1,
                            transition: {
                                duration: 0.2,
                                ease: "linear",
                            },
                        },
                        exit: {
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "linear",
                            },
                        },
                    }}
                >
                    <div
                        className={styles.overlay}
                        onClick={(e) => this.changePage(e, "/menu")}
                    ></div>
                </motion.div>

                {/* Transition for content - functions like a normal div + transitional attributes */}
                <motion.div
                    className={styles.gamesMenu}
                    initial="initial"
                    animate={this.state.isOpen ? "enter" : "exit"}
                    variants={{
                        initial: {
                            opacity: 0,
                            y: "90%",
                        },
                        enter: {
                            opacity: 1,
                            y: "0%",
                            transition: {
                                delay: 0.2,
                                duration: 0.3,
                                ease: "easeInOut",
                            },
                        },
                        exit: {
                            opacity: 0,
                            y: "90%",
                            transition: {
                                duration: 0.3,
                                ease: "easeInOut",
                            },
                        },
                    }}
                >
                    <header>
                        <div className={styles.logo}>
                            <img
                                src="/images/logo.svg"
                                className={styles.logoImg}
                                alt="Covalent Logo"
                            ></img>
                            <p>COVALENT</p>
                        </div>
                        <h1>FIND THE PERFECT ICEBREAKER FOR YOU!</h1>
                        <div>
                            <button
                                className={styles.exit}
                                onClick={(e) => this.changePage(e, "/menu")}
                            >
                                Exit
                            </button>
                        </div>
                    </header>
                    <div className={styles.gamesBackground}>
                        <div className={styles.gamesFrame}>
                            <div className={styles.transparent}>
                                <div className={styles.scrollingWrapper}>
                                    <div className={styles.games}>
                                        <div className={styles.game} id="1">
                                            <div
                                                className={
                                                    styles.gameTransparent
                                                }
                                            >
                                                <div className={styles.panel}>
                                                    <div
                                                        className={styles.title}
                                                    >
                                                        Two Truths And A Lie
                                                    </div>
                                                    <button
                                                        className={styles.link}
                                                        onClick={() => {
                                                            this.props.router.push(
                                                                "/new"
                                                            );
                                                        }}
                                                    >
                                                        Play!
                                                    </button>
                                                </div>
                                                <div className={styles.text}>
                                                    Two Truths and a Lie is a
                                                    quick and easy way to get to
                                                    know a little about your
                                                    teammates! In the hot seat,
                                                    share a couple quick
                                                    factoids and a believable
                                                    lie, and try to figure out
                                                    your teammates’ lies when
                                                    guessing.
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.game} id="2">
                                            <div
                                                className={
                                                    styles.gameTransparent
                                                }
                                            >
                                                <div className={styles.panel}>
                                                    <div
                                                        className={styles.title}
                                                    >
                                                        Twenty Questions
                                                    </div>
                                                    <div
                                                        className={styles.link}
                                                    >
                                                        Coming Soon
                                                    </div>
                                                </div>
                                                <div className={styles.text}>
                                                    20 Questions is a fun game
                                                    where teammates work
                                                    together asking yes or no
                                                    questions to the person in
                                                    the hot seat in order to
                                                    reveal their secret talent!
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.game} id="3">
                                            <div
                                                className={
                                                    styles.gameTransparent
                                                }
                                            >
                                                <div className={styles.panel}>
                                                    <div
                                                        className={styles.title}
                                                    >
                                                        In Development
                                                    </div>
                                                    <div
                                                        className={styles.link}
                                                    >
                                                        Coming Soon
                                                    </div>
                                                </div>
                                                <div className={styles.text}>
                                                    More icebreakers coming
                                                    soon!
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.game} id="4">
                                            <div
                                                className={
                                                    styles.gameTransparent
                                                }
                                            >
                                                <div className={styles.panel}>
                                                    <div
                                                        className={styles.title}
                                                    >
                                                        In Development
                                                    </div>
                                                    <div
                                                        className={styles.link}
                                                    >
                                                        Coming Soon
                                                    </div>
                                                </div>
                                                <div className={styles.text}>
                                                    More icebreakers coming
                                                    soon!
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.game} id="5">
                                            <div
                                                className={
                                                    styles.gameTransparent
                                                }
                                            >
                                                <div className={styles.panel}>
                                                    <div
                                                        className={styles.title}
                                                    >
                                                        In Development
                                                    </div>
                                                    <div
                                                        className={styles.link}
                                                    >
                                                        Coming Soon
                                                    </div>
                                                </div>
                                                <div className={styles.text}>
                                                    More icebreakers coming
                                                    soon!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }
}

export default routingWrapper(HostMenu);
