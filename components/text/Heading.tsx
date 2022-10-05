import { HTMLAttributes } from "react";
import classNames from "utils/classNames";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {}

const Heading = ({ children, className, ...props }: HeadingProps) => {
  return (
    <h2 className={classNames("text-blue33", className)} {...props}>
      {children}
    </h2>
  );
};

export default Heading;
