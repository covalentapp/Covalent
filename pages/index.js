import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Connect from '../components/Connect'
import Sharing from '../components/Sharing'

export default function Home() {
  return (
    <div>
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
        <title>Covalent</title>
      </Head>
      <div className={styles.landingPage}>
        {/*<div className={styles.connect}><Connect /></div>
        <div className={styles.sharing}><Sharing /></div>*/}
        <p>The landing page will be here.</p>
      </div>
    </div>
  )
}
