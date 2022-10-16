import { IconSearch } from "components/icons";
import { Image } from "components/image";
import { Popover } from "components/popover";
import { defaultAvatar } from "constants/image";
import { PATH } from "constants/path";
import { signOut } from "firebase/auth";
import usePopover from "hooks/usePopover";
import { auth } from "libs/firebase/firebase-config";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import useStore from "store/store";
import { createUsernameFromEmail } from "utils";

const stylesPopoverLink =
  "text-[#000000cc] block px-5 py-2 hover:bg-[#fafafa] transition-all duration-300 hover:text-[#00bfa5]";
const Header = () => {
  const { currentUser } = useStore();
  const { activePopover, hidePopover, showPopover } = usePopover();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const handleSearchWithKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${PATH.search}?keyword=${keyword}`);
  };
  return (
    <header style={{ backgroundImage: `url("/bg-header.jpg")` }}>
      <div className="layout-container">
        <nav className="flex items-center h-[52px] relative justify-between">
          <Link href={PATH.home}>
            <a>
              <Image src="/logo-nettruyen.png" alt="logo" className="w-[150px]" />
            </a>
          </Link>
          <form
            onSubmit={handleSearchWithKeyword}
            className="md:flex hidden items-center justify-between flex-1 max-w-[400px] pl-3 h-8 bg-white rounded-sm"
          >
            <input
              type="text"
              className="flex-1 h-8 text-sm outline-none"
              placeholder="Tìm truyện"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="px-3">
              <IconSearch />
            </button>
          </form>
          {currentUser?.email ? (
            <div
              className="relative h-full text-white w-max"
              onMouseEnter={showPopover}
              onMouseLeave={hidePopover}
            >
              <div className="flex items-center justify-end h-full gap-x-2 transition-all duration-100 hover:text-[#ffffffb3] cursor-pointer">
                <Image
                  alt="avatar"
                  src={currentUser?.photoURL || defaultAvatar}
                  className="object-cover w-5 h-5 rounded-full"
                />
                <span className="font-medium max5se:line-clamp-1 ">
                  {createUsernameFromEmail(currentUser?.email as string)}
                </span>
              </div>
              <Popover active={activePopover} className="w-max">
                <Link href={PATH.profile}>
                  <a className="popover-link">Tài khoản của tôi</a>
                </Link>
                <button
                  type="button"
                  className={"popover-link w-full text-left"}
                  onClick={() => signOut(auth)}
                >
                  Đăng xuất
                </button>
              </Popover>
            </div>
          ) : (
            <div className="flex gap-x-4">
              <Link href={PATH.signUp}>
                <a className="text-[#ffffffb3] transition-all duration-100 hover:opacity-70">
                  Đăng kí
                </a>
              </Link>
              <Link href={PATH.signIn}>
                <a className="text-[#ffffffb3] transition-all duration-100 hover:opacity-70">
                  Đăng nhập
                </a>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
