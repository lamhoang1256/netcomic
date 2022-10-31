import { SearchBox } from "components/form";
import { IconHome } from "components/icons";
import { CustomLink } from "components/link";
import { PATH } from "constants/path";
import { RefObject } from "react";
import SidebarCloseAction from "./SidebarCloseAction";

const menuLinks = [
  {
    display: "TRANG CHỦ",
    path: PATH.home,
  },
  {
    display: "TÀI KHOẢN",
    path: PATH.profile,
  },
  {
    display: "THEO DÕI",
    path: PATH.follow,
  },
  {
    display: "LỊCH SỬ",
    path: PATH.history,
  },
  {
    display: "XẾP HẠNG",
    path: `${PATH.search}?status=-1&sort=10`,
  },
  {
    display: "TÌM TRUYỆN",
    path: PATH.filter,
  },
  {
    display: "CON TRAI",
    path: PATH.boy,
  },
  {
    display: "CON GÁI",
    path: PATH.girl,
  },
];

interface MenuProps {
  menuRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const Menu = ({ menuRef, overlayRef, toggleMenu, closeMenu }: MenuProps) => {
  return (
    <div className="bg-[#eee] dark:bg-[#0d0321]">
      <div className="layout-container">
        <aside
          className="-translate-x-full z-[300] lg:dark:bg-[#0d0321] lg:bg-[#eee] bg-[#0d0321] text-white lg:text-black lg:dark:text-white w-full fixed top-0 left-0 bottom-0 lg:translate-x-0 p-5 lg:p-0 transition-transform duration-300 lg:static"
          ref={menuRef}
        >
          <SidebarCloseAction onCloseSidebar={toggleMenu} />
          <ul className="flex flex-col lg:flex-row gap-x-2">
            <li className="block lg:hidden">
              <SearchBox className="mb-2 lg:mb-0" callback={closeMenu} />
            </li>
            {menuLinks.map((link) => (
              <li key={link.display}>
                <CustomLink href={link.path} className="flex items-center pr-3 h-11">
                  {link.display}
                </CustomLink>
              </li>
            ))}
          </ul>
        </aside>
        <div
          aria-hidden
          ref={overlayRef}
          onClick={closeMenu}
          className="inset-0 -m-3 overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] z-[200]"
        />
      </div>
    </div>
  );
};

export default Menu;
