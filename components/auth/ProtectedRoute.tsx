import { PATH } from "constants/path";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useGlobalStore from "store/global-store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useGlobalStore();
  console.log("loading: ", loading);
  console.log("currentUser: ", currentUser);
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (!currentUser || !currentUser.email) {
      router.push(PATH.signIn);
    }
  }, [currentUser, loading, router]);
  return <>{currentUser ? children : null}</>;
};

export default ProtectedRoute;
