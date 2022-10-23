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
