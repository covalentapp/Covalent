import React, { Component } from "react";
import Head from "next/head";
import styles from "../styles/Menu.module.css";
import SimpleButton from "../components/SimpleButton";
import routingWrapper from "../components/routingWrapper";
import HostMenu from "../components/host";
import Error from "../components/Error";
import { motion } from "framer-motion";

//This file is for the Game Selection/Menu/Homepage for Covalent
//@Michael

const origin =
    process.env.NODE_ENV == "production"
        ? "https://covalent.app"
        : "http://localhost:3000";

//super long regex function that checks if the current user is on a mobile device, use only if nothing else works
/*window.mobileCheck = function () {
    let check = false;
    (function (a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};*/

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            error: false,
            host: false,
            // Detect mobile
            mobile: false,
            // Detect Firefox
            firefox: false,
            // Detect Chrome
            chrome: false,
        };
    }

    handleRouteChange = () => {
        if (window.location.href == origin + "/menu/?host") {
            this.setState({ host: true });
        }
    };

    componentDidMount() {
        window.scrollTo(0,0);

        this.props.router.events.on(
            "routeChangeComplete",
            this.handleRouteChange
        );

        //checks mobile, firefox, or chrome
        this.setState({
            mobile: navigator.userAgent.indexOf("Mobi") > -1,
            firefox: navigator.userAgent.indexOf("Firefox") > -1,
            chrome: navigator.userAgent.indexOf("Chrome") > -1,
        });
    }

    componentWillUnmount() {
        this.props.router.events.off(
            "routeChangeComplete",
            this.handleRouteChange
        );
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
    };

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
                <motion.div
                    initial="initial"
                    animate={
                        (!this.state.chrome && !this.state.firefox) ||
                        this.state.mobile
                            ? "enter"
                            : "exit"
                    }
                    exit="exit"
                    variants={{
                        initial: {
                            opacity: 0,
                            display: "none",
                        },
                        enter: {
                            opacity: 1,
                            display: "block",
                            transition: {
                                duration: 0.1,
                                ease: "linear",
                            },
                        },
                        exit: {
                            opacity: 0,
                            display: "none",
                            transition: {
                                duration: 0.1,
                                ease: "linear",
                            },
                        },
                    }}
                >
                    <div className={styles.overlay} />
                    <div className={styles.errorMsg}>
                        <Error
                            noLink={true}
                            text="Covalent currently only supports Google Chrome or Mozilla Firefox on a computer."
                        />
                    </div>
                </motion.div>
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
                {this.state.host && <HostMenu close={this.hostClose} />}
            </div>
        );
    }
}

export default routingWrapper(Menu);
