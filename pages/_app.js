import { Amplify } from "aws-amplify";
Amplify.configure({ ssr: true });

import '../styles/globals.css'
import "react-slideshow-image/dist/styles.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowCircleRight);
library.add(faCheckCircle);
library.add(faTimesCircle);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
