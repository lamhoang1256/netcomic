/* eslint-disable react/button-has-type */
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";
import classNames from "utils/classNames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
}

const Button = ({ children, type, className, to, ...props }: ButtonProps) => {
  if (to) {
    return (
      <Link href={to}>
        <button
          type={type}
          {...props}
          className={classNames(
            "px-3 py-2 hover:opacity-80 transition-all duration-200 rounded",
            className
          )}
        >
          {children}
        </button>
      </Link>
    );
  }
  return (
    <button
      type={type}
      {...props}
      className={classNames(
        "px-3 py-2 hover:opacity-80 transition-all duration-200 rounded",
        className
      )}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  to: "",
};

export default Button;
