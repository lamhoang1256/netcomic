import { IFilter } from "@types";
import { PATH } from "constants/path";
import { useRouter } from "next/router";
import { useState } from "react";
import Select from "react-tailwindcss-select";

interface FilterGenresProps {
  genres: IFilter[];
}

interface IOption {
  disabled: boolean;
  isSelected: boolean;
  label: string;
  value: string;
}

const FilterGenres = ({ genres }: FilterGenresProps) => {
  const router = useRouter();
  const [value, setValue] = useState<IOption[] | null>(null);
  const handleChange = (value: any) => {
    setValue(value);
    const genres: string[] = value ? value?.map((v: IOption) => v.value) : "";
    router.push({
      href: PATH.filter,
      query: { ...router.query, genres: genres.toString() as string },
    });
  };
  return (
    <Select
      placeholder="Chọn thể loại truyện"
      options={genres}
      value={value}
      isMultiple={true}
      onChange={handleChange}
    />
  );
};

export default FilterGenres;
