import "assets/styles/global.scss";
import { useEffect } from "react";
import { Authentication } from "components/auth";
import { ErrorBoundary } from "components/errorBoundary";
import { Meta } from "components/meta";
import Router from "next/router";
import useDarkMode from "hooks/useDarkMode";
import type { AppProps } from "next/app";
import Modal from "react-modal";
import NProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "nprogress/nprogress.css";

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  content: {}
};

function MyApp({ Component, pageProps }: AppProps) {
  useDarkMode();
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);
    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
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
