import { IPagination } from "@types";
import { CustomLink } from "components/link";
import { HTMLAttributes } from "react";
import classNames from "utils/classNames";

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  paginations: IPagination[];
}

const Pagination = ({ paginations, className, ...props }: PaginationProps) => {
  return (
    <div
      className={classNames("py-[30px] flex gap-x-[3px] flex-wrap lg:justify-center", className)}
      {...props}
    >
      {paginations.map((pagination) => {
        if (!pagination.title && !pagination.href) return null;
        return (
          <CustomLink
            key={pagination.display}
            href={pagination.href}
            className={classNames(
              "border w-[37px] h-[37px] flex items-center justify-center rounded-sm",
              pagination.active
                ? "text-white bg-[#00a5f0] border-blue33"
                : "bg-white text-[#999] border-[#ddd]"
            )}
          >
            {pagination.display}
          </CustomLink>
        );
      })}
    </div>
  );
};

export default Pagination;
