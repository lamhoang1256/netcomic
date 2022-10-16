import { ICurrentUser } from "@types";
import create from "zustand";

interface Stored {
  currentUser: ICurrentUser;
  setCurrentUser: (user: ICurrentUser) => void;
  follows: string[];
  loading: boolean;
  addFollow: (comic: string) => void;
  deleteFollow: (comic: string) => void;
  setFollow: (comics: string[]) => void;
  setLoading: (newLoading: boolean) => void;
}

const useStore = create<Stored>((set) => ({
  currentUser: {} as ICurrentUser,
  follows: [],
  loading: false,
  addFollow: (comic: string) => set((state) => ({ follows: [...state.follows, comic] })),
  deleteFollow: (comic: string) =>
    set((state) => ({
      follows: state.follows.filter((item) => item !== comic),
    })),
  setFollow: (comics: string[]) => set(() => ({ follows: comics })),
  setCurrentUser: (user: ICurrentUser) => set(() => ({ currentUser: user })),
  setLoading: (newLoading: boolean) => set(() => ({ loading: newLoading })),
}));

export default useStore;
