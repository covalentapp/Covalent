import React, { useEffect, useState } from 'react';
import styles from '../styles/Timer.module.css';

// Timer for participants
// https://medium.com/better-programming/building-a-simple-countdown-timer-with-react-4ca32763dda7
// @Daniel

function Timer ({ time, disabled, details, submitted, parentTime }) {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        setMinutes(Math.floor(time / 60));
        setSeconds(time - (Math.floor((time / 60)) * 60))
    }, [time, disabled]);

    useEffect(() => {
        if (!disabled) {
           let interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
                parentTime(seconds + (minutes * 60));
            }, 1000)
            return () => clearInterval(interval);
        }
    }, [seconds, minutes, disabled])

        return (
                <div className={styles.timer + " " + styles[!minutes && seconds && (seconds < 10) && 'timerDanger']}>
                    <div className={styles.timerText}>
                        <p1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p1>
                        {details && <p2>{submitted || "0"} SUBMITTED</p2>}
                    </div>
                    <img
                            src="/images/clock.svg"
                            className={styles.clockImg}
                            alt="Clock"
                    ></img>
                </div>
        )
}

export default Timer;