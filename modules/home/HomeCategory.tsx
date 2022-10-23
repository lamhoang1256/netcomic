import { ICategory } from "@types";
import axios from "axios";
import { CustomLink } from "components/link";
import { Heading } from "components/text";
import { server } from "configs/server";
import { PATH } from "constants/path";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeCategory = () => {
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
    <div className="mt-5">
      <Heading className="text-xl">Thể loại</Heading>
      <Swiper slidesPerView="auto" slidesPerGroupAuto spaceBetween={8} className="mt-3">
        {categories.map((category, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <CustomLink
              href={`${PATH.search}/${category.href}`}
              className="py-1 px-[10px] whitespace-pre rounded border border-blue33 text-blue33 bg-blue-100 scroll-snap-category inline-block"
            >
              {category.display}
            </CustomLink>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="scroll-snap-categories">
        {categories.map((category, index) => (
          <CustomLink
            key={index}
            href={`${PATH.search}/${category.href}`}
            className="py-1 px-[10px] whitespace-pre rounded border border-blue33 text-blue33 bg-blue-100 scroll-snap-category"
          >
            {category.display}
          </CustomLink>
        ))}
      </div> */}
    </div>
  );
};

export default HomeCategory;
