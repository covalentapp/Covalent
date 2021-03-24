import Head from "next/head";
import styles from "../styles/Home.module.css";
import Connect from "../components/landing/Connect";
import Sharing from "../components/landing/Sharing";
import NavBar from "../components/landing/NavBar";
import Features from "../components/landing/Features";
import LandingGames from "../components/landing/LandingGames";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";

/* MIXPANEL: Landing Page Visits */

var mixpanel = require("mixpanel-browser");
mixpanel.init("92c1e92aad6c8ad0239edbd97ceac712");

if (process.env.NODE_ENV == "production") {
  mixpanel.track("Site Visit");
}

export default function Home() {
  return (
    <div>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B2HTTGWN3M"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());            
              gtag('config', 'G-B2HTTGWN3M');
              `,
          }}
        />
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
        <title>Covalent</title>
        <meta property="og:title" content="Covalent" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://covalent.app/" />
        <meta
          property="og:image"
          content="https://covalent.app/images/logo192.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="192" />
        <meta property="og:image:height" content="192" />
        <meta property="og:image:alt" content="Covalent logo" />
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
        <div className={styles.navContainer}></div>
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
          {/*<div id="contact">
                        <Contact />
            </div>*/}
          <div id="footer">
            <Footer />
          </div>
          <div></div>
        </span>
        {/*<p>The landing page will be here.</p>*/}
      </div>
    </div>
  );
}
