import { Image } from "components/image";
import { CustomLink } from "components/link";
import { PATH } from "constants/path";
import { Sidebar } from "layouts";

const sidebarLinks = [
  {
    icon: "/icon-account.png",
    path: PATH.userManage,
    display: "Quản lý người dùng",
  },
  {
    icon: "/icon-account.png",
    path: PATH.commentManage,
    display: "Quản lý bình luận",
  },
];

const DashboardSidebar = () => {
  return (
    <Sidebar labelOpenSidebar="Danh mục">
      <ul>
        {sidebarLinks.map((link) => (
          <li key={link.display} className="mb-4">
            <CustomLink href={link.path} className="flex items-center gap-x-3">
              <Image src={link.icon} alt={link.display} className="w-5 h-5" />
              <span>{link.display}</span>
            </CustomLink>
          </li>
        ))}
      </ul>
    </Sidebar>
  );
};

export default DashboardSidebar;
