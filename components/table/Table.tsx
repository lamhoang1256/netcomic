import { TableHTMLAttributes } from "react";
import classNames from "utils/classNames";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

const Table = ({ className, children }: TableProps) => {
  return <div className={classNames("table-styles", className)}>{children}</div>;
};

export default Table;
