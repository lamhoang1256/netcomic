import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const CustomLink = ({ children, href = "/", ...props }: CustomLinkProps) => {
  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  );
};

export default CustomLink;
