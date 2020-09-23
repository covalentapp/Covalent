import React, { Component } from 'react';
import styles from '../styles/Timer.module.css';

// Timer for participants
// https://medium.com/better-programming/building-a-simple-countdown-timer-with-react-4ca32763dda7
// @Daniel

class Timer extends Component {

    /* 
    
    This looks great! We're eventually going to have to change state into one used by the whole app.
    For now, though, everything looks awesome. If you have any questions on state, componentDidMount/WillUnmount, etc. please ask me!

    */

    state = {
        minutes: 1,
        seconds: 30,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
                <div className={styles.timer}>
                    <div className={styles.timerText}>
                        <p1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p1>
                        <p2>0 SUBMITTED</p2>
                        {/* Change number 0 to a dynamic number in state later */}
                    </div>
                    <img
                            src="/images/clock.svg"
                            className={styles.clockImg}
                            alt="Clock"
                    ></img>
                </div>
        )
    }
}

export default Timer;