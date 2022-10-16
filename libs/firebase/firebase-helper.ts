import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const getFollowComics = async (userId: string) => {
  const colRef = doc(db, "users", userId);
  const data = await getDoc(colRef);
  return data?.data()?.follows;
};
