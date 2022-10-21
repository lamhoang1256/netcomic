import { userRole } from "constants/global";
import { PATH } from "constants/path";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useGlobalStore from "store/global-store";
import ProtectedRoute from "./ProtectedRoute";

const CheckAdmin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { currentUser } = useGlobalStore();
  useEffect(() => {
    if (currentUser?.role !== userRole.ADMIN) router.push(PATH.pageNotFound);
  }, [currentUser, router]);
  return <ProtectedRoute>{currentUser ? children : null}</ProtectedRoute>;
};

export default CheckAdmin;
