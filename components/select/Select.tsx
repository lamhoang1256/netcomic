import { useEffect, useState } from "react";
import SelectTailwindcss from "react-tailwindcss-select";

export interface IOption {
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
  defaultValue?: IOption | null;
  callback?: (value: IOption) => void;
}

const Select = ({ options, defaultValue = null, callback, ...props }: SelectProps) => {
  const [value, setValue] = useState<IOption | null>(defaultValue);
  const handleChange = (value: any) => {
    setValue(value);
    callback && callback(value);
  };
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <div className="select">
      <SelectTailwindcss options={options} value={value} onChange={handleChange} {...props} />
    </div>
  );
};

export default Select;
