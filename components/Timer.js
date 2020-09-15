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
        minutes: 2,
        seconds: 0,
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
                <div className={styles.box}>
                    <p className={styles.time}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                    <p className={styles.submitted}>0 SUBMITTED</p>
                    {/* Change number 0 to a dynamic number in state later */}
                    <div><img src="/images/clock.svg" className={styles.clock} alt="clock"/></div>
                </div>
        )
    }
}

export default Timer;