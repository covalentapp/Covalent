import React from "react";
import styles from "../../styles/landing/Footer.module.css";
var mixpanel = require("mixpanel-browser");
mixpanel.init("92c1e92aad6c8ad0239edbd97ceac712");

let twitterAnalytics = () => {
  if (process.env.NODE_ENV == "production") {
    mixpanel.track("Twitter Visits");
  }
};

let instagramAnalytics = () => {
  if (process.env.NODE_ENV == "production") {
    mixpanel.track("Instagram Visits");
  }
};

export default function Footer() {
  return (
    <div className={styles.footer}>
      <span id={styles.alignright}>
        <div className={styles.twitter}>
          <a href="https://twitter.com/covalentapp" onClick={twitterAnalytics}>
            Follow us on Twitter!
          </a>
        </div>
        <div>
          <a
            href="https://instagram.com/covalentapp?igshid=1xjtnl953g3e6"
            onClick={instagramAnalytics}
          >
            Follow us on Instagram!
          </a>
        </div>
      </span>
      <span className={styles.copyright}>&#169; Covalent 2020</span>
    </div>
  );
}
