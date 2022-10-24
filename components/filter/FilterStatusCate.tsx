import { IFilter } from "@types";
import { PATH } from "constants/path";
import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-tailwindcss-select";

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
}

interface FilterStatusCateProps extends SelectProps {
  options: IFilter[];
}

interface IOption {
  disabled: boolean;
  isSelected: boolean;
  label: string;
  value: string;
}

const FilterStatusCate = ({ options, ...props }: FilterStatusCateProps) => {
  const router = useRouter();
  const [value, setValue] = useState<IOption | null>(null);
  const handleChange = (value: any) => {
    setValue(value);
    router.push(`${PATH.search}/${router.query.category}${value.value}`);
  };
  return (
    <div className="select-small">
      <Select options={options} value={value} onChange={handleChange} {...props} />
    </div>
  );
};

export default FilterStatusCate;
