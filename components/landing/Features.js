import React from "react";
import { Fade } from "react-slideshow-image";
import styles from "../../styles/landing/Features.module.css";

const properties = {
    duration: 10000,
    indicators: true,
};

const spanStyles = {
    color: "#5A4FCF",
};

export default function Features() {
    return (
        <div className={styles.features}>
            <div className={styles.slideContainer}>
                <Fade {...properties}>
                    <div className={styles.eachFade}>
                        <h1>
                            <span style={spanStyles}>Customize</span> your games
                        </h1>
                        <p>
                            Custom settings for each game allow you to cater
                            icebreakers to your needs!
                        </p>
                        <img
                            src="images/host.png"
                            className={styles.featureImg}
                        ></img>
                    </div>
                    <div className={styles.eachFade}>
                        <h1>
                            Create <span style={spanStyles}>personalized</span>{" "}
                            videos
                        </h1>
                        <p>
                            Integrated video feeds allow you to express yourself
                            during the icebreakers!
                        </p>
                        <img
                            src="images/submit.png"
                            className={styles.featureImg}
                        ></img>
                    </div>
                    <div className={styles.eachFade}>
                        <h1>
                            See the <span style={spanStyles}>results</span>
                        </h1>
                        <p>
                            A simple results screen determines the bonding
                            champion!
                        </p>
                        <img
                            src="images/result.png"
                            className={styles.featureImg}
                        ></img>
                    </div>
                </Fade>
            </div>
        </div>
    );
}
