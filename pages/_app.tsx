import "assets/styles/global.scss";
import { Authentication } from "components/auth";
import { ErrorBoundary } from "components/errorBoundary";
import { Meta } from "components/meta";
import useDarkMode from "hooks/useDarkMode";
import type { AppProps } from "next/app";
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
      <Meta />
      <Authentication>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
        <ToastContainer></ToastContainer>
      </Authentication>
    </>
  );
}

export default MyApp;
