import "../styles/global.scss";
import type { AppProps } from "next/app";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  content: {},
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer></ToastContainer>
    </>
  );
}

export default MyApp;
