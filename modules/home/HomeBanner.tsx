import { IComic } from "@types";
import { IconTime } from "components/icons";
import { CustomLink } from "components/link";
import { Heading } from "components/text";
import { PATH } from "constants/path";
import { ComicImage } from "modules/comic";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface HomeBannerProps {
  banners: IComic[];
}

const HomeBanner = ({ banners }: HomeBannerProps) => {
  return (
    <section className="pt-4 md:pt-3">
      <Heading className="text-xl mb-[10px]">Truyện đề cử</Heading>
      <Swiper
        loop
        slidesPerView="auto"
        slidesPerGroupAuto
        spaceBetween={14}
        navigation={true}
        modules={[Navigation]}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.slug} className="!w-[187px]">
            <div className="relative overflow-hidden border rounded border-graydd">
              <CustomLink href={`${PATH.comic}/${banner.slug}`}>
                <ComicImage src={banner.posterUrl} alt={banner.slug} className="aspect-[190/250]" />
              </CustomLink>
              <div className="absolute bottom-0 left-0 right-0 p-[5px] text-white bg-overlay">
                <CustomLink
                  href={`${PATH.comic}/${banner.slug}`}
                  className="line-clamp-1 text-[15px] text-center"
                >
                  {banner.title}
                </CustomLink>
                <div className="flex items-center justify-center gap-[10px] mt-1">
                  <CustomLink href={`${PATH.comic}/${banner.newestHref}`} className="text-xs">
                    {banner.newestChapter}
                  </CustomLink>
                  <span className="flex items-center gap-[2px] text-[11px] italic">
                    <IconTime className="text-white" /> {banner.updatedAgo}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HomeBanner;
