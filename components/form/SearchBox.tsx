import { IconSearch } from "components/icons";
import { PATH } from "constants/path";
import { useRouter } from "next/router";
import { FormEvent, FormHTMLAttributes, useState } from "react";
import classNames from "utils/classNames";

interface SearchBoxProps extends FormHTMLAttributes<HTMLFormElement> {}

const SearchBox = ({ className, ...props }: SearchBoxProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const handleSearchWithKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${PATH.search}?keyword=${keyword}`);
  };
  return (
    <form
      onSubmit={handleSearchWithKeyword}
      className={classNames(
        "flex items-center justify-between flex-1 max-w-[400px] px-3 h-8 bg-white rounded-sm",
        className
      )}
      {...props}
    >
      <input
        type="text"
        className="flex-1 h-8 text-sm text-black outline-none"
        placeholder="Tìm truyện"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="px-3">
        <IconSearch />
      </button>
    </form>
  );
};

export default SearchBox;
