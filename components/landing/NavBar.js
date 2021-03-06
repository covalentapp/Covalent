import React, { useState, useEffect } from "react";
import SimpleButton from "../SimpleButton";
import styles from "../../styles/landing/NavBar.module.css";
import { Link, animateScroll as scroll } from "react-scroll";
import { scrollToTop } from "react-scroll/modules/mixins/animate-scroll";
import HamburgerMenu from "react-hamburger-menu";
import { useRouter } from "next/router";

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const [small, setSmall] = useState(true);
    const [menuHeight, setHeight] = useState(15);
    const router = useRouter();

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    function handleMenuClick() {
        setOpen(!open);
    }

    useEffect(() => {
        setSmall(window.innerWidth < 612);
        function handleResize() {
            if (window.innerWidth < 612) {
                setSmall(true);
            } else {
                setSmall(false);
                setOpen(false);
            }
            if (window.innerHeight > 400) {
                setHeight(window.innerHeight / 48.5);
            } else {
                setHeight(8.25);
            }
        }

        window.addEventListener("resize", handleResize);
    });

    const handleStartClick = (e) => {
        e.preventDefault();
        router.push("/menu");
    };

    return (
            <div className={styles.nav}>
                <div className={styles.temp}>
                    <div className={styles.logo}>
                        <img
                            src="/images/logo.svg"
                            className={styles.logoImg}
                            alt="Covalent Logo"
                        ></img>
                        <p>Covalent</p>
                    </div>
                    <div className={styles.hMenu}>
                        <HamburgerMenu
                            isOpen={open}
                            menuClicked={handleMenuClick}
                            width={menuHeight * 1.2}
                            height={menuHeight}
                        />
                        {/*eventually replace with my own hamburgermenu for custom sizing*/}
                    </div>
                </div>
                <div className={styles.hamburger}>
                    <div
                        className={styles.buttons}
                        id={open && small ? styles.show : null}
                    >
                        <button onClick={scrollToTop}>Home</button>
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
                                style={{ padding: "0 calc(5px + 0.4vw)" }}
                                onClick={handleStartClick}
                            />
                        </span>
                    </div>
                </div>
            </div>
    );
}
