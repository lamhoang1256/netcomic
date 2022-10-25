import { HTMLAttributes } from "react";
import classNames from "utils/classNames";

interface LabelStatusProps extends HTMLAttributes<HTMLSpanElement> {
  type: string;
}

const LabelStatus = ({ children, type = "default" }: LabelStatusProps) => {
  let styleClassName = "";
  switch (type) {
    case "success":
      styleClassName = "text-green-500 bg-green-100";
      break;
    case "warning":
      styleClassName = "text-orange-500 bg-orange-100";
      break;
    case "danger":
      styleClassName = "text-red-500 bg-red-100";
      break;
    default:
      break;
  }
  return (
    <span
      className={classNames(
        "rounded-lg inline-block py-1 px-3 text-sm text-gray-500 bg-gray-100",
        styleClassName
      )}
    >
      {children}
    </span>
  );
};

export default LabelStatus;
