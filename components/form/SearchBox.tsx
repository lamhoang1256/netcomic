import { IconSearch } from "components/icons";
import { PATH } from "constants/path";
import { useRouter } from "next/router";
import { FormEvent, FormHTMLAttributes, useState } from "react";
import classNames from "utils/classNames";

interface SearchBoxProps extends FormHTMLAttributes<HTMLFormElement> {
  callback?: () => void;
}

const SearchBox = ({ className, callback = () => {}, ...props }: SearchBoxProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const handleSearchWithKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${PATH.search}?keyword=${keyword}`);
    setKeyword("");
    callback && callback();
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
        value={keyword}
        placeholder="Tìm truyện"
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 h-8 text-sm text-black outline-none"
      />
      <button type="submit" className="px-3">
        <IconSearch className="text-black" />
      </button>
    </form>
  );
};

export default SearchBox;
