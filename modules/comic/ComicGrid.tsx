import { HTMLAttributes } from "react";
import classNames from "utils/classNames";

interface ComicGridProps extends HTMLAttributes<HTMLDivElement> {}

const ComicGrid = ({ children, className, ...props }: ComicGridProps) => {
  return (
    <div className={classNames("comic-list", className)} {...props}>
      {children}
    </div>
  );
};

export default ComicGrid;
