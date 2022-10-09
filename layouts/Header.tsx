import { IconSearch } from "components/icons";
import { PATH } from "constants/path";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const handleSearchWithKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${PATH.search}?keyword=${keyword}`);
  };
  return (
    <header style={{ backgroundImage: `url("/bg-header.jpg")` }}>
      <div className="layout-container">
        <nav className="flex items-center h-[52px] justify-between">
          <Link href={PATH.home}>
            <a>
              <Image src="/logo-nettruyen.png" width={150} height={30} alt="logo" />
            </a>
          </Link>
          <form
            onSubmit={handleSearchWithKeyword}
            className="flex items-center justify-between flex-1 max-w-[400px] pl-3 h-8 bg-white rounded-sm"
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
