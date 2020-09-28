import Head from "next/head";
import styles from "../styles/Home.module.css";
import Connect from "../components/landing/Connect";
import Sharing from "../components/landing/Sharing";
import NavBar from "../components/landing/NavBar";
import Features from "../components/landing/Features";
import LandingGames from "../components/landing/LandingGames";
import Footer from "../components/landing/Footer";

export default function Home() {
    return (
        <div>
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
                    height: auto;
                    overflow-x: hidden;
                }
            `}</style>
            <div className={styles.landingPage}>
                <NavBar />
                <span className={styles.pageContent}>
                    <div id="connect">
                        <Connect />
                    </div>
                    <div id="sharing">
                        <Sharing />
                    </div>
                    <div id="features">
                        <Features />
                    </div>
                    <div id="games">
                        <LandingGames />
                    </div>
                    <div id="footer">
                        <Footer />
                    </div>
                </span>
                {/*<p>The landing page will be here.</p>*/}
            </div>
        </div>
    );
}
