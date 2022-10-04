import { IPagination } from "types";

interface PaginationProps {
  pagination: IPagination[];
}

const Pagination = ({ pagination }: PaginationProps) => {
  return (
    <div className="my-[30px] flex gap-x-[3px] justify-center">
      {pagination.map((button) => {
        const styles = button.active
          ? "w-[37px] h-[37px] text-white border bg-[#00a5f0] border-blue33"
          : "w-[37px] h-[37px] bg-white text-[#999] border border-[#ddd]";
        if (!button.title || !button.href) return null;
        return (
          <button className={styles} key={button.href}>
            {button.display}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
