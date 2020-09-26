import { Amplify } from "aws-amplify";
Amplify.configure({ ssr: true });

import '../styles/globals.css'
import "react-slideshow-image/dist/styles.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
