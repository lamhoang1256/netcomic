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
              "border w-[38px] h-[38px] dark:border-[#4c4c4c] flex items-center justify-center rounded-sm",
              pagination.active
                ? "text-white dark:bg-yellowffc bg-[#00a5f0] border-blue33 dark:text-black"
                : "bg-white text-[#999] dark:bg-[#343a40] dark:text-white border-[#ddd]"
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
