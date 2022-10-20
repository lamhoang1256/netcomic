import { userRole } from "constants/global";
import { PATH } from "constants/path";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useGlobalStore from "store/global-store";

const CheckAdmin = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useGlobalStore();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser || currentUser?.role !== userRole.ADMIN) router.push(PATH.pageNotFound);
  }, [currentUser, router]);
  return <>{currentUser ? children : null}</>;
};

export default CheckAdmin;
