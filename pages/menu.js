import React, { Component } from "react";
import Head from "next/head";
import styles from "../styles/Menu.module.css";
import SimpleButton from "../components/SimpleButton";
import routingWrapper from "../components/routingWrapper";
import HostMenu from "../components/host";

//This file is for the Game Selection/Menu/Homepage for Covalent
//@Michael

const origin = (process.env.NODE_ENV == 'production') ? "https://covalent.app" : "http://localhost:3000";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            error: false,
            host: false,
        };
    }
    
    handleRouteChange = () => {
        if(window.location.href == origin + "/menu/?host") {
            this.setState({ host: true });
        }
    }
        
    componentDidMount() {
        this.props.router.events.on('routeChangeComplete', this.handleRouteChange);
    }

    componentWillUnmount() {
        this.props.router.events.off('routeChangeComplete', this.handleRouteChange);
    }

    handleJoinClick = (event) => {
        if (this.state.code != "" && this.state.code.length == 6) {
            this.props.router.push("join/" + this.state.code);
        } else {
            this.setState({ code: this.state.code, error: true });
        }
    };


    handleHostClick = (e) => {
        e.preventDefault();
        this.props.router.push("/menu//?host", undefined, { shallow: true });
        this.setState({ host: true });
    };

    hostClose = () => {
        this.setState({ host: false });
    }

    handleChange = (event) => {
        this.setState({ code: event.target.value, error: false });
    };

    render() {
        return (
            <div className={styles.MenuContainer}>
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
                    <link
                        rel="apple-touch-icon"
                        href="/images/logo192.png"
                    />
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
                <div className={styles.Menu}>
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
                                <label className={styles.joinCodeLabel}>
                                    CODE:
                                    <input
                                        placeholder="ABCDEF"
                                        className={
                                            styles.codeInput +
                                            " " +
                                            (this.state.error &&
                                                styles.codeInputError)
                                        }
                                        type="text"
                                        maxLength="6"
                                        value={this.state.code}
                                        onChange={this.handleChange}
                                    />
                                </label>
                            </div>
                            <div className={styles.defaultButton}>
                                <SimpleButton
                                    name="JOIN"
                                    type="join"
                                    onClick={this.handleJoinClick}
                                ></SimpleButton>
                            </div>
                            <div className={styles.defaultButton}>
                                <SimpleButton
                                    name="HOST"
                                    type="host"
                                    fontmin="0px"
                                    onClick={this.handleHostClick}
                                ></SimpleButton>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.host ? <HostMenu close={this.hostClose}/> : null}
            </div>
        );
    }
}

export default routingWrapper(Menu);
