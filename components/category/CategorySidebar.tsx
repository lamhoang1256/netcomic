import { ICategory } from "@types";
import { CustomLink } from "components/link";
import { Heading } from "components/text";
import { PATH } from "constants/path";

interface CategorySidebarProps {
  categories: ICategory[];
}

const CategorySidebar = ({ categories }: CategorySidebarProps) => {
  return (
    <div className="p-3 border rounded gap-y-2 border-graydd">
      <Heading className="pb-1 text-lg font-medium border-b border-graydd">Thể loại</Heading>
      <ul className="grid grid-cols-2 mt-2 gap-y-2">
        {categories.map((category) => (
          <li key={category.display} className="border-b border-graydd">
            <CustomLink
              href={`${PATH.search}/${category.href}`}
              className="block py-1 transition-all duration-150 hover:text-rede5"
            >
              {category.display}
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
