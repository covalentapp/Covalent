import React, { Component } from "react";
import SimpleButton from "../SimpleButton";
import styles from "../../styles/landing/NavBar.module.css";
import { Link, animateScroll as scroll } from "react-scroll";
import { scrollToTop } from "react-scroll/modules/mixins/animate-scroll";

class NavBar extends Component {
    scrollToTop = () => {
        scroll.scrollToTop();
    };

    render() {
        return (
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <img
                        src="/images/logo.svg"
                        className={styles.logoImg}
                        alt="Covalent Logo"
                    ></img>
                    <p>Covalent</p>
                </div>
                <div className={styles.buttons}>
                    <button onClick={this.scrollToTop}>Home</button>
                    <button>
                        <Link
                            to="features"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            Features
                        </Link>
                    </button>
                    <button>
                        <Link
                            to="games"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            Games
                        </Link>
                    </button>
                    {/*<button>Pricing</button>*/}
                    <span>
                        <SimpleButton
                            type="purple"
                            name="Start Bonding"
                            style={{ padding: "0 1vw" }}
                        />
                    </span>
                </div>
            </div>
        );
    }
}

export default NavBar;
