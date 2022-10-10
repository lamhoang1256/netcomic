import { Sidebar } from "layouts";
import Link from "next/link";

const sidebarLinks = [
  {
    icon: "https://e-shopbee.vercel.app/images/icon-account.png",
    path: "/",
    display: "Tài khoản của tôi",
  },
];

const UserSidebar = () => {
  return (
    <Sidebar labelOpenSidebar="Tài khoản của tôi">
      <div className="flex items-center gap-x-2">
        <img
          src="https://res.cloudinary.com/lamhoang1256/image/upload/v1659780525/shopbee/1a2d07a2d37fffb914b22345dbfebfd3.jpg"
          alt=""
          className="object-cover w-10 h-10 rounded-full"
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
                <img src={link.icon} alt={link.display} className="w-5 h-5" />
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
