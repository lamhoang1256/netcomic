import { ICurrentUser } from "@types";
import create from "zustand";

interface Stored {
  currentUser: ICurrentUser;
  setCurrentUser: (user: ICurrentUser) => void;
  follows: string[];
  history: string[];
  loading: boolean;
  setFollow: (comics: string[]) => void;
  setHistory: (comics: string[]) => void;
  setLoading: (newLoading: boolean) => void;
}

const useStore = create<Stored>((set) => ({
  currentUser: {} as ICurrentUser,
  follows: [],
  history: [],
  loading: false,
  setFollow: (comics: string[]) => set(() => ({ follows: comics })),
  setHistory: (comics: string[]) => set(() => ({ follows: comics })),
  setCurrentUser: (user: ICurrentUser) => set(() => ({ currentUser: user })),
  setLoading: (newLoading: boolean) => set(() => ({ loading: newLoading })),
}));

export default useStore;
