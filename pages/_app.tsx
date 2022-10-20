import Head from "next/head";
import Modal from "react-modal";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "assets/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "libs/firebase/firebase-config";
import useGlobalStore from "store/global-store";
import { onAuthStateChanged } from "firebase/auth";
import { ICurrentUser } from "@types";

Modal.setAppElement("#__next");
Modal.defaultStyles = {
  content: {},
};

function MyApp({ Component, pageProps }: AppProps) {
  const { setCurrentUser, setFollow, setHistory } = useGlobalStore();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return setCurrentUser({} as ICurrentUser);
      const docRef = query(collection(db, "users"), where("email", "==", user.email));
      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach(async (document) => {
          setCurrentUser({ ...user, ...document.data() });
          const colRef = doc(db, "users", user.uid);
          const data = await getDoc(colRef);
          setFollow(data?.data()?.follows);
        });
      });
    });
    setHistory(JSON.parse(localStorage.getItem("history") || "[]"));
  }, [setCurrentUser, setHistory, setFollow]);

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
