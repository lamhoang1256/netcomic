import "assets/styles/global.scss";
import { Authentication } from "components/auth";
import useDarkMode from "hooks/useDarkMode";
import type { AppProps } from "next/app";
import Head from "next/head";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  content: {},
};

function MyApp({ Component, pageProps }: AppProps) {
  useDarkMode();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Authentication>
        <Component {...pageProps} />
        <ToastContainer></ToastContainer>
      </Authentication>
    </>
  );
}

export default MyApp;
