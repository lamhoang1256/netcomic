import { ICategory } from "@types";
import axios from "axios";
import { Heading } from "components/text";
import { server } from "configs/server";
import { PATH } from "constants/path";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategorySidebar = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const fetchCategories = async () => {
    try {
      const { data } = (await axios.get(`${server}/api/category`)).data;
      setCategories(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-3 mt-6 border rounded gap-y-2 border-graydd">
      <Heading className="pb-1 mb-2 text-lg font-medium border-b border-graydd">Thể loại</Heading>
      <ul className="grid grid-cols-2 gap-y-2">
        {categories.map((category) => (
          <li key={category.display} className="border-b border-graydd">
            <Link href={`${PATH.search}/${category.href}`}>
              <a className="block py-1 transition-all duration-150 hover:text-rede5">
                {category.display}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
