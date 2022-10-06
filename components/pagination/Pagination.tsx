import { IPagination } from "@types";

interface PaginationProps {
  paginations: IPagination[];
}

const Pagination = ({ paginations }: PaginationProps) => {
  return (
    <div className="my-[30px] flex gap-x-[3px] flex-wrap lg:justify-center">
      {paginations.map((pagination) => {
        const styles = pagination.active
          ? "w-[37px] h-[37px] text-white border bg-[#00a5f0] border-blue33"
          : "w-[37px] h-[37px] bg-white text-[#999] border border-[#ddd]";
        if (!pagination.title && !pagination.href) return null;
        return (
          <button className={styles} key={pagination.display}>
            {pagination.display}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
