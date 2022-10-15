import { IconGithub } from "components/icons";
import { PATH } from "constants/path";
import type { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <div className="bg-[#222] text-graydd">
      <div className="flex items-center justify-between !py-5 layout-container">
        <span>Nguyen Hoang Lam &copy; 2022</span>
        <p className="block md:hidden">Nguyen Hoang Lam &copy;</p>
        <div className="flex items-center gap-3">
          <span>Contact me: </span>
          <a target="_blank" rel="noopener noreferrer" href={PATH.projectGithub}>
            <IconGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
