import { TableHTMLAttributes } from "react";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

const Table = ({ children }: TableProps) => {
  return <div className="table">{children}</div>;
};

export default Table;
