import { Amplify } from "aws-amplify";
Amplify.configure({ ssr: true });

import '../styles/globals.css'

import "react-slideshow-image/dist/styles.css"; // landing page slideshow

// Font Awesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleRight, faCheckCircle, faTimesCircle, faTrophy, faMedal } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowCircleRight, faCheckCircle, faTimesCircle, faTrophy, faMedal);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
