import classNames from "utils/classNames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ name, className, ...props }: InputProps) => {
  return (
    <input
      id={name}
      name={name}
      className={classNames(
        "px-4 rounded outline-none h-[42px] border border-[#00000024] focus:border focus:border-[#0000008a] shadow-input",
        className
      )}
      {...props}
    />
  );
};

export default Input;
