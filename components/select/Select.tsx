import { useState } from "react";
import SelectLib from "react-tailwindcss-select";

interface IOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  placeholder?: string;
  isMultiple?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  loading?: boolean;
  menuIsOpen?: boolean;
  searchInputPlaceholder?: string;
  noOptionsMessage?: string;
  options: IOption[];
}

const Select = ({ options, ...props }: SelectProps) => {
  const [value, setValue] = useState<IOption | null>(null);
  const handleChange = (value: any) => {
    setValue(value);
  };
  return (
    <div className="select">
      <SelectLib options={options} value={value} onChange={handleChange} {...props} />
    </div>
  );
};

export default Select;
