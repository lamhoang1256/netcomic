import { ICurrentUser } from "@types";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "libs/firebase/firebase-config";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IAuthContext {
  currentUser: ICurrentUser;
  setCurrentUser: Dispatch<SetStateAction<ICurrentUser>>;
  loading: boolean;
}
const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}
function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<ICurrentUser>({} as ICurrentUser);
  const value = { currentUser, setCurrentUser, loading };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCurrentUser({} as ICurrentUser);
        setLoading(false);
        return;
      }
      const docRef = query(collection(db, "users"), where("email", "==", user.email));
      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) =>
          setCurrentUser({
            ...user,
            ...doc.data(),
          })
        );
      });
      setLoading(false);
    });
  }, []);
  return (
    <AuthContext.Provider value={value} {...props}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuthContext };
