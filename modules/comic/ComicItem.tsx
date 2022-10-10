import { IconChat, IconEye, IconHeart } from "components/icons";
import { PATH } from "constants/path";
import Link from "next/link";
import { IComic } from "@types";
import ComicImage from "./parts/ComicImage";

interface ComicItemProps {
  comic: IComic;
}

const ComicItem = ({ comic }: ComicItemProps) => {
  return (
    <div>
      <div className="relative overflow-hidden rounded aspect-[2.2/3]">
        <ComicImage src={comic.posterUrl} alt={comic.slug} />
        <div className="absolute bottom-0 left-0 text-xs right-0 py-[5px] text-white bg-overlay flex items-center justify-between md:px-2 gap-x-[2px]">
          <div className="flex items-center gap-x-[2px]">
            <IconEye />
            <span>{comic.viewCount}</span>
          </div>
          <div className="flex items-center gap-x-[2px]">
            <IconChat />
            <span>{comic.commentCount}</span>
          </div>
          <div className="flex items-center gap-x-[2px]">
            <IconHeart />
            <span>{comic.followCount}</span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Link href={`${PATH.comic}/${comic.slug}`}>
          <a className="mt-1 transition-all duration-200 md:text-base line-clamp-2 hover:text-blue29">
            {comic.title}
          </a>
        </Link>
        <div>
          {comic.chapters?.map((chapter, index) => (
            <div className="flex items-center justify-between mt-1" key={index}>
              <Link href={`${PATH.comic}/${chapter.href}`}>
                <a className="text-[13px] transition-all duration-200 hover:text-blue29">
                  {chapter.name}
                </a>
              </Link>
              <span className="text-[11px] text-[#c0c0c0] italic">{chapter.updatedAgo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComicItem;
