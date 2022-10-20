import { PATH } from "constants/path";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useGlobalStore from "store/global-store";

const CheckLoggedIn = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useGlobalStore();
  const router = useRouter();
  useEffect(() => {
    if (currentUser && currentUser.email) router.push(PATH.home);
  }, [currentUser, router]);
  return <>{children}</>;
};

export default CheckLoggedIn;
