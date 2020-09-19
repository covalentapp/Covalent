import Head from 'next/head'
import SimpleButton from '../components/SimpleButton';
import Avatar from '../components/Avatar';
import styles from '../styles/Settings.module.css';


/*This file is for the Settings component for Covalent
@Catherine*/

export default function Settings() {
    return (
        <div>
            <style jsx global>{`
                body {
                    text-align: center; 
                    margin-top: 50px; 
                    font-family:'Roboto', sans-serif; 
                    width: 80%;
                    max-width: 1000px;
                    margin-left: auto;
                    margin-right: auto;
                }
            `}</style>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Remote team-building made super simple"
                />
                <link rel="apple-touch-icon" href="/images/logo192.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/favicon.ico" />
                <title>Covalent | New Game</title>
            </Head>
            <h1>Instructions</h1>
            <p>In 2 Truths &#38; A Lie, you say (or in this case, type) 3 statements about yourself, 2 of which should be truths and 1 of which should be a lie. However, other players do not know which statement is a lie! Their objective is to guess which one is the lie, and your objective is to make them choose the wrong statement as the lie, so make the truths as interesting as possible!</p>
            <p>As the host, write any additional instructions for all your teammates' introduction videos and choose the settings for your game below:</p>
            <div className={styles.settingsForm} id="settings-form">
                <b><label htmlFor="time">Time Limit (30-300s): </label></b>
                <input className={styles.settingsInput} type="number" min="30" max="300" step="30" defaultValue="30" />
                <b><label htmlFor="players">Player Count (2-50): </label></b>
                <input className={styles.settingsInput} type="number" min="2" max="50" defaultValue="2" />
                <b><label htmlFor="rounds">Number of Rounds (1-10): </label></b>
                <input className={styles.settingsInput} type="number" min="1" max="10" defaultValue="1" />
                <br></br>
                <b><label htmlFor="instructions">Instructions For Players:</label></b>
                <br></br>
                <textarea className={styles.instructions} id="instructions" rows="4" cols="50" placeholder="What do you want to tell your players?">
                </textarea>
                <br></br>
                <b><label>Code:
                    <input className={styles.settingsInput + " " + styles.code} type="text" value="ABCDEF" id="code" readOnly />
                </label></b>
                <b><label>Link:
                     <input className={styles.settingsInput + " " + styles.link} type="text" value="covalent.app/join/abcdef" id="link" readOnly />
                </label></b>
                {/* TODO: 
                    - Write code to Code, Link, and Copy button
                */}
                <button className={styles.settingsButton} onClick={() => { navigator.clipboard.writeText("covalent.app/join/abcdef") }}><b>COPY LINK</b></button>
                <br></br>
                <SimpleButton name="start" type="join"></SimpleButton>
            </div>
            <hr className={styles.line}/>
            <h2>Joined</h2>
            <table className={styles.avatarTable}>
                <tbody>
                <tr>
                    <th><Avatar name='Arek Der-Sarkissian' /></th>
                    <th><Avatar name='Catherine Hu' /></th>
                    <th><Avatar name='Daniel Dai' /></th>
                    <th><Avatar name='Nouf Al Soghyar' /></th>
                    <th><Avatar name='Michael Shi' /></th>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
