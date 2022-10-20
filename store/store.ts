import { IComicHistory, ICurrentUser } from "@types";
import { LocalStorage } from "constants/localStorage";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface IGlobalStore {
  currentUser: ICurrentUser | null;
  setCurrentUser: (user: ICurrentUser) => void;
  follows: string[];
  history: IComicHistory[];
  setFollow: (comics: string[]) => void;
  setHistory: (comics: IComicHistory[]) => void;
}

const useGlobalStore = create<IGlobalStore>()(
  devtools((set) => ({
    currentUser: null,
    follows: [],
    history: [],
    setFollow: async (comics: string[]) => {
      set(() => ({ follows: comics }));
    },
    setHistory: (comics: IComicHistory[]) => {
      localStorage.setItem(LocalStorage.history, JSON.stringify(comics));
      set(() => ({ history: comics }));
    },
    setCurrentUser: (user: ICurrentUser) => set(() => ({ currentUser: user })),
  }))
);

export default useGlobalStore;
