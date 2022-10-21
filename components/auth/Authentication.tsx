import { LoadingSpinner } from "components/loading";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "libs/firebase/firebase-config";
import React, { useEffect } from "react";
import useGlobalStore from "store/global-store";

function Authentication({ children }: { children: React.ReactNode }) {
  const { setCurrentUser, setFollow, setHistory, loading, setLoading } = useGlobalStore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (!user) return;
      const docRef = query(collection(db, "users"), where("email", "==", user.email));
      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach(async (document) => {
          setCurrentUser({ ...user, ...document.data() });
          const colRef = doc(db, "users", user.uid);
          const data = await getDoc(colRef);
          setFollow(data?.data()?.follows);
        });
      });
      setHistory(JSON.parse(localStorage.getItem("history") || "[]"));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setCurrentUser, setLoading, setHistory, setFollow]);
  return <>{loading ? <LoadingSpinner /> : children}</>;
}

export default Authentication;
