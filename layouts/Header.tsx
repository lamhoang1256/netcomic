import { ButtonToggleTheme } from "components/button";
import { SearchBox } from "components/form";
import { IconList } from "components/icons";
import { Image } from "components/image";
import { CustomLink } from "components/link";
import { Popover } from "components/popover";
import { userRole } from "constants/global";
import { defaultAvatar } from "constants/image";
import { PATH } from "constants/path";
import { signOut } from "firebase/auth";
import useClickOutside from "hooks/useClickOutside";
import usePopover from "hooks/usePopover";
import { auth } from "libs/firebase";
import { useRef } from "react";
import useGlobalStore from "store/global-store";
import { createUsernameFromEmail } from "utils";
import Menu from "./Menu";

const links = [
  {
    display: "Tài khoản của tôi",
    path: PATH.profile,
  },
  {
    display: "Truyện theo dõi",
    path: PATH.follow,
  },
  {
    display: "Đăng xuất",
    path: "/",
    onClick: () => signOut(auth),
  },
];
const linksWithoutLogged = [
  {
    display: "Đăng ký",
    path: PATH.signUp,
  },
  {
    display: "Đăng nhập",
    path: PATH.signIn,
  },
];

const Header = () => {
  const { currentUser } = useGlobalStore();
  const { activePopover, hidePopover, showPopover } = usePopover();
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    if (menuRef.current) menuRef.current.classList.toggle("!translate-x-0");
    if (overlayRef.current) overlayRef.current.classList.toggle("fixed");
  };
  const closeMenu = () => {
    if (menuRef.current) menuRef.current.classList.remove("!translate-x-0");
    if (overlayRef.current) overlayRef.current.classList.remove("fixed");
  };
  useClickOutside(menuRef, () => closeMenu());
  return (
    <header className="h-[52px] lg:h-[96px]">
      <div style={{ backgroundImage: `url("/bg-header.jpg")` }} className="h-[52px]">
        <div className="layout-container">
          <nav className="relative h-[52px] flex items-center justify-between">
            <CustomLink href={PATH.home}>
              <Image src="/logo-netcomic.png" alt="logo" className="w-[116px]" />
            </CustomLink>
            <SearchBox className="hidden lg:flex" />
            <div className="flex items-center gap-x-4">
              <ButtonToggleTheme />
              {currentUser?.email ? (
                <div
                  className="relative h-full text-white w-max"
                  onMouseEnter={showPopover}
                  onMouseLeave={hidePopover}
                >
                  <div className="flex items-center justify-end h-full gap-x-2 transition-all duration-100 hover:text-[#ffffffb3] cursor-pointer">
                    <Image
                      alt="avatar"
                      src={currentUser?.avatar || defaultAvatar}
                      className="object-cover w-[22px] h-[22px] rounded-full"
                    />
                    <span className="hidden font-medium max5se:line-clamp-1 md:inline-block">
                      {createUsernameFromEmail(currentUser?.email as string)}
                    </span>
                  </div>
                  <Popover active={activePopover} className="w-max">
                    {currentUser?.role === userRole.ADMIN && (
                      <CustomLink href={PATH.manage} className="popover-link">
                        Dashboard
                      </CustomLink>
                    )}
                    {links.map((link) => (
                      <CustomLink
                        href={link.path}
                        key={link.display}
                        onClick={link.onClick}
                        className="popover-link"
                      >
                        {link.display}
                      </CustomLink>
                    ))}
                  </Popover>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-x-4">
                  {linksWithoutLogged.map((link) => (
                    <CustomLink
                      href={link.path}
                      key={link.display}
                      className="text-[#ffffffb3] whitespace-nowrap transition-all duration-100 hover:opacity-70"
                    >
                      {link.display}
                    </CustomLink>
                  ))}
                </div>
              )}
              <button onClick={toggleMenu} className="lg:hidden">
                <IconList className="!w-5 !h-5" fill="#fff" />
              </button>
            </div>
          </nav>
        </div>
      </div>
      <Menu
        menuRef={menuRef}
        overlayRef={overlayRef}
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
      />
    </header>
  );
};

export default Header;
