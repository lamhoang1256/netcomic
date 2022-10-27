import { useState, InputHTMLAttributes } from "react";
import classNames from "utils/classNames";
import { IconHiddenPassword, IconShowPassword } from "components/icons";

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = ({ name, className, ...props }: InputPasswordProps) => {
  const [focus, setFocus] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const toggleVisiblePassword = () => {
    setVisiblePassword((prevState) => !prevState);
  };
  return (
    <div
      className={classNames(
        "flex items-center border shadow-input pr-4 text-black bg-white rounded overflow-hidden",
        focus ? "border-[#0000008a]" : "border-[#00000023]"
      )}
    >
      <input
        id={name}
        name={name}
        type={visiblePassword ? "text" : "password"}
        className={classNames("px-4 outline-none h-10 flex-1", className)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
      <button type="button" onClick={toggleVisiblePassword} className="w-5 h-5">
        {visiblePassword ? <IconShowPassword /> : <IconHiddenPassword />}
      </button>
    </div>
  );
};

export default InputPassword;
