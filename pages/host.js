import React, { Component } from "react";
import styles from "../styles/GamesMenu.module.css";
import SimpleButton from "../components/SimpleButton";
import { TimelineMax, Power1, Linear } from "gsap/dist/gsap";


//remaining tasks for GamesMenu: add in the information + formatting for each of the individual games
//+ one issue: the games currently go OVER the "transparent" div - i want it to go under

class GamesMenu extends Component {
    constructor(props) {
        super(props);
        this.timeline = new TimelineMax({ paused: true });
        this.state = { width: window.innerWidth, height: window.innerHeight };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    animDistance() {
        return this.state.height * 0.9;
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        this.timeline
            .from(this.overlay, 0.2, {
                display: "none",
                autoAlpha: 0,
                ease: Linear.easeInOut,
            })
            .from(this.content, 0.3, {
                y: this.animDistance(),
                ease: Power1.easeInOut,
            });

        this.timeline.play();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    changePage = (e, destination) => {
        e.preventDefault();
        this.timeline.reverse();
        const timelineDuration = this.timeline.duration() * 1000;
        setTimeout(() => {
            this.props.history.push(destination);
        }, timelineDuration);
    };

    getGamesNumber() {
        return document.body.getElementsByClassName("game").length;
    }

    render() {
        return (
            <div className={styles.gamesMenuContainer}>
                <div
                    className={styles.overlay}
                    ref={(div) => (this.overlay = div)}
                    onClick={(e) => this.changePage(e, "/")}
                ></div>
                <div className={styles.gamesMenu} ref={(div) => (this.content = div)}>
                    <header>
                        <div className={styles.logo}>
                            <img
                                src="images/logos.svg"
                                className={styles.logoImg}
                                alt="Covalent Logo"
                            ></img>
                            <p>COVALENT</p>
                        </div>
                        <h1>FIND THE PERFECT ICEBREAKER FOR YOU!</h1>
                        <div className={styles.exit}>
                            <button onClick={(e) => this.changePage(e, "/")}>
                                Exit
                            </button>
                        </div>
                    </header>
                    <div className={styles.gamesBackground}>
                        <div className={styles.gamesFrame}>
                        <div className={styles.transparent}></div>
                            <div className={styles.scrollingWrapper}>
                            <div className={styles.games}>
                                <div className={styles.game} id="1"><div className={styles.gameTransparent}>hi</div></div>
                                <div className={styles.game} id="2"><div className={styles.gameTransparent}>hi</div></div>
                                <div className={styles.game} id="3"><div className={styles.gameTransparent}>hi</div></div>
                                <div className={styles.game} id="4"><div className={styles.gameTransparent}>hi</div></div>
                                <div className={styles.game} id="5"><div className={styles.gameTransparent}>hi</div></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GamesMenu;
