import Head from "next/head";
import Modal from "react-modal";
import type { AppProps } from "next/app";
import { AuthProvider } from "store/auth-context";
import { ToastContainer } from "react-toastify";
import "assets/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  content: {},
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer></ToastContainer>
    </AuthProvider>
  );
}

export default MyApp;
