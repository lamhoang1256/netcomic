import { IconTime } from "components/icons";
import { Heading } from "components/text";
import { PATH } from "constants/path";
import Link from "next/link";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { IComic } from "@types";
import { ComicImage } from "modules/comic";

interface HomeBannerProps {
  banners: IComic[];
}

const HomeBanner = ({ banners }: HomeBannerProps) => {
  return (
    <section className="pt-4">
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
            <div className="relative overflow-hidden rounded">
              <ComicImage src={banner.posterUrl} alt={banner.slug} className="aspect-[190/250]" />
              <div className="absolute bottom-0 left-0 right-0 p-[5px] text-white bg-overlay">
                <Link href={`${PATH.comic}/${banner.slug}`}>
                  <a className="line-clamp-1 text-[15px] text-center">{banner.title}</a>
                </Link>
                <div className="flex items-center justify-center gap-[10px] mt-1">
                  <Link href={`${PATH.comic}/${banner.newestHref}`}>
                    <a className="text-xs">{banner.newestChapter}</a>
                  </Link>
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
