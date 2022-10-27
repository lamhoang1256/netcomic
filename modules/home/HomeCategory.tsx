import { ICategory } from "@types";
import { CustomLink } from "components/link";
import { Heading } from "components/text";
import { PATH } from "constants/path";
import { Swiper, SwiperSlide } from "swiper/react";

interface HomeCategoryProps {
  categories: ICategory[];
}

const HomeCategory = ({ categories }: HomeCategoryProps) => {
  return (
    <div className="mt-5">
      <Heading className="text-xl">Thể loại</Heading>
      <Swiper slidesPerView="auto" slidesPerGroupAuto spaceBetween={8} className="mt-3">
        {categories.map((category, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <CustomLink
              href={`${PATH.search}/${category.href}`}
              className="py-[6px] px-[10px] dark:bg-transparent dark:hover:text-yellowffc dark:hover:border-yellowffc dark:border-blue1c dark:text-white whitespace-pre rounded border hover:text-redf6 hover:border-redf6 hover:bg-red-100 transition-all duration-300 border-blue33 text-blue33 bg-blue-100 scroll-snap-category inline-block"
            >
              {category.display}
            </CustomLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeCategory;
