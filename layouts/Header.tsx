import { PATH } from "constants/path";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header style={{ backgroundImage: `url("/bg-header.jpg")` }}>
      <div className="layout-container">
        <nav className="flex items-center h-[52px]">
          <Link href={PATH.home}>
            <a>
              <Image src="/logo-nettruyen.png" width={150} height={30} alt="logo" />
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
