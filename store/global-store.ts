import { IComicHistory, ICurrentUser } from "@types";
import { LocalStorage } from "constants/localStorage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "libs/firebase-app";
import { toast } from "react-toastify";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IGlobalStore {
  currentUser: ICurrentUser | null;
  setCurrentUser: (user: ICurrentUser | null) => void;
  follows: string[];
  history: IComicHistory[];
  setFollow: (comics: string[]) => void;
  addFollow: (slug: string) => void;
  removeFollow: (slug: string) => void;
  setHistory: (comics: IComicHistory[]) => void;
  loading: boolean;
  setLoading: (newLoading: boolean) => void;
}

const useGlobalStore = create<IGlobalStore>()(
  devtools((set, get) => ({
    currentUser: null,
    follows: [],
    history: [],
    setFollow: (comics: string[]) => {
      set(() => ({ follows: comics }));
    },
    addFollow: async (slug: string) => {
      const currentUser = get().currentUser;
      if (!currentUser) return;
      const colRef = doc(db, "users", currentUser.uid);
      const newFollows = [slug, ...get().follows];
      await updateDoc(colRef, { follows: newFollows });
      toast.success("Đã theo dõi truyện này!");
      set(() => ({ follows: newFollows }));
    },
    removeFollow: async (slug: string) => {
      const currentUser = get().currentUser;
      if (!currentUser) return;
      const colRef = doc(db, "users", currentUser.uid);
      const newFollows = get().follows.filter((comic) => comic !== slug);
      await updateDoc(colRef, { follows: newFollows });
      toast.success("Đã hủy theo dõi truyện này!");
      set(() => ({ follows: newFollows }));
    },
    setHistory: (comics: IComicHistory[]) => {
      localStorage.setItem(LocalStorage.history, JSON.stringify(comics));
      set(() => ({ history: comics }));
    },
    setCurrentUser: (user: ICurrentUser | null) => set(() => ({ currentUser: user })),
    loading: true,
    setLoading: (newLoading: boolean) => set(() => ({ loading: newLoading })),
  }))
);

export default useGlobalStore;
