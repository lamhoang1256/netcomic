import { IconFilter } from "components/icons";
import { Heading } from "components/text";
import { ComicGrid, ComicItem } from "modules/comic";
import Link from "next/link";
import { IComic } from "types";

interface HomeNewestComicProps {
  newestComics: IComic[];
}

const HomeNewestComic = ({ newestComics }: HomeNewestComicProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading className="text-xl">Truyện đề cử</Heading>
        <Link href="/">
          <a className="w-[30px] h-[30px] border border-[#ff9601] rounded-full flex items-center justify-center">
            <IconFilter fill="#ff9601" />
          </a>
        </Link>
      </div>
      <ComicGrid className="mt-[10px]">
        {newestComics.map((comic) => (
          <ComicItem comic={comic} key={comic.slug} />
        ))}
      </ComicGrid>
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
