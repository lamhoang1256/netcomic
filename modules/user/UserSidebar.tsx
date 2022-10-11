import { Image } from "components/image";
import { PATH } from "constants/path";
import { Sidebar } from "layouts";
import Link from "next/link";

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
    icon: "/icon-password.png",
    path: PATH.comment,
    display: "Bình luận của tôi",
  },
  {
    icon: "/icon-password.png",
    path: PATH.follow,
    display: "Truyện theo dõi",
  },
];

const UserSidebar = () => {
  return (
    <Sidebar labelOpenSidebar="Tài khoản của tôi">
      <div className="flex items-center gap-x-2">
        <Image
          alt="avatar"
          src="https://res.cloudinary.com/lamhoang1256/image/upload/v1659780525/shopbee/1a2d07a2d37fffb914b22345dbfebfd3.jpg"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold line-clamp-1">User</h3>
          <Link href="/">Sửa hồ sơ</Link>
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
