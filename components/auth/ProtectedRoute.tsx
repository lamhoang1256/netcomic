import { PATH } from "constants/path";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useGlobalStore from "store/global-store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useGlobalStore();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser || !currentUser.email) router.push(PATH.signIn);
  }, [currentUser, router]);
  return <>{currentUser ? children : null}</>;
};

export default ProtectedRoute;
