import { CustomLink } from "components/link";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";
import classNames from "utils/classNames";

interface ComicTitleProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const ComicTitle = ({ children, className, href = "/", ...props }: ComicTitleProps) => {
  return (
    <CustomLink
      href={href}
      className={classNames(
        "transition-all duration-200 md:text-base font-bold line-clamp-2 cursor-pointer hover:text-blue29 dark:text-blue1c",
        className
      )}
      {...props}
    >
      {children}
    </CustomLink>
  );
};

export default ComicTitle;
