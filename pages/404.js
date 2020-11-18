import React from "react";
import styles from "../styles/Custom404.module.css";
import Head from "next/head";
import Link from "next/link";


export default function Custom404() {
    return (
        <div className={styles.Custom404}>
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
                    <link
                        rel="apple-touch-icon"
                        href="/images/logo192.png"
                    />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="icon" href="/favicon.ico" />
                    <title>Covalent | Page Not Found</title>
                </Head>
                <style jsx global>{`
                    img {
                        width: 180px;
                        height: auto;
                        position: absolute;
                        top: 87%;
                        left: 50%;
                        right: -50%;
                        transform: translate(-50%, -50%);
                    }
                `}</style>
                <img src="/images/logo-wordmark.svg" alt="Partial Logo"/>
                 <div className={styles.errorBlock}>
                     <h2 className={styles.errorNumber}>Error 404</h2>
                     <h2 className={styles.errorText}>Covalent couldn't find that bond.</h2>
                     <span className={styles.errorLink}>
                        <Link href="/" >GO BACK</Link>
                     </span>
                 </div>
        </div>
    )
}