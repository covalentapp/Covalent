import { Amplify } from "aws-amplify";
Amplify.configure({ ssr: true });

import '../styles/globals.css'
import "react-slideshow-image/dist/styles.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowCircleRight);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
