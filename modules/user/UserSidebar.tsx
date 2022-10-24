import { Image } from "components/image";
import { defaultAvatar } from "constants/image";
import { PATH } from "constants/path";
import { Sidebar } from "layouts";
import Link from "next/link";
import useGlobalStore from "store/global-store";
import { createUsernameFromEmail } from "utils";

const sidebarLinks = [
  {
    icon: "/icon-account.png",
    path: PATH.profile,
    display: "Tài khoản của tôi",
  },
  {
    icon: "/icon-password.png",
    path: PATH.changePassword,
    display: "Đổi mật khẩu",
  },
  {
    icon: "/icon-comment.png",
    path: PATH.comment,
    display: "Bình luận của tôi",
  },
  {
    icon: "/icon-follow.png",
    path: PATH.follow,
    display: "Truyện theo dõi",
  },
  {
    icon: "/icon-history.png",
    path: PATH.history,
    display: "Lịch sử xem",
  },
];

const UserSidebar = () => {
  const { currentUser } = useGlobalStore();
  return (
    <Sidebar labelOpenSidebar="Tài khoản của tôi">
      <div className="flex items-center gap-x-2">
        <Image
          alt="avatar"
          src={currentUser?.photoURL || defaultAvatar}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold line-clamp-1">
            {createUsernameFromEmail(currentUser?.email as string)}
          </h3>
          <Link href={PATH.profile}>Sửa hồ sơ</Link>
        </div>
      </div>
      <ul className="mt-7">
        {sidebarLinks.map((link) => (
          <li key={link.display} className="mb-4">
            <Link href={link.path}>
              <a className="flex items-center gap-x-3">
                <Image src={link.icon} alt={link.display} className="w-5 h-5" />
                <span>{link.display}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Sidebar>
  );
};

export default UserSidebar;
