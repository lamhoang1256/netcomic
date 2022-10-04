import { IconChat, IconEye, IconHeart } from "components/icons";
import { Pagination } from "components/pagination";
import { Heading } from "components/text";
import { ComicItem } from "modules/comic";
import { IComic, IPagination } from "types";

interface HomeNewestComicProps {
  newestComics: IComic[];
  pagination: IPagination[];
}

const HomeNewestComic = ({ newestComics, pagination }: HomeNewestComicProps) => {
  return (
    <div className="w-2/3 px-[15px]">
      <Heading>Truyện mới cập nhật</Heading>
      <div className="grid grid-cols-4 gap-[14px]">
        {newestComics.map((comic) => (
          <ComicItem comic={comic} key={comic.slug} />
        ))}
      </div>
      <Pagination pagination={pagination} />
    </div>
  );
};

export default HomeNewestComic;

{
  /* <div>
  <div className="relative">
    <picture>
      <source
        srcSet="http://st.nhattruyenone.com/data/comics/126/khong-co-dao-lu-se-chet.jpg"
        type="image/webp"
      />
      <img
        alt=""
        src="http://st.nhattruyenone.com/data/comics/126/khong-co-dao-lu-se-chet.jpg"
      />
    </picture>
    <div className="absolute bottom-0 left-0 text-xs right-0 p-[5px] text-white bg-overlay flex items-center justify-between">
      <div className="flex items-center gap-x-[2px]">
        <IconEye />
        <span>3.889K</span>
      </div>
      <div className="flex items-center gap-x-[2px]">
        <IconChat />
        <span>3.889</span>
      </div>
      <div className="flex items-center gap-x-[2px]">
        <IconHeart />
        <span>3.889</span>
      </div>
    </div>
  </div>
  <h3 className="mt-1 text-base transition-all duration-200 line-clamp-2 hover:text-blue29">
    Không Có Đạo Lữ Sẽ Chết
  </h3>
  <div>
    <div className="flex items-center justify-between mt-1">
      <span className="text-[13px]">Chapter 54</span>
      <span className="text-[11px] text-[#c0c0c0] italic">10 phút trước</span>
    </div>
    <div className="flex items-center justify-between mt-1">
      <span className="text-[13px]">Chapter 54</span>
      <span className="text-[11px] text-[#c0c0c0] italic">10 phút trước</span>
    </div>
    <div className="flex items-center justify-between mt-1">
      <span className="text-[13px]">Chapter 54</span>
      <span className="text-[11px] text-[#c0c0c0] italic">10 phút trước</span>
    </div>
  </div>
</div> */
}
