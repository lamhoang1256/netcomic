import { IComic } from "@types";
import { IconChat, IconEye, IconHeart } from "components/icons";
import { CustomLink } from "components/link";
import { PATH } from "constants/path";
import ComicChapters from "./parts/ComicChapters";
import ComicImage from "./parts/ComicImage";
import ComicTitle from "./parts/ComicTitle";

interface ComicItemProps {
  comic: IComic;
}

const ComicItem = ({ comic }: ComicItemProps) => {
  return (
    <div>
      <div className="relative overflow-hidden rounded aspect-[2.2/3]">
        <CustomLink href={`${PATH.comic}/${comic.slug}`}>
          <ComicImage src={comic.posterUrl} alt={comic.slug} />
        </CustomLink>
        <div className="absolute bottom-0 left-0 text-xs right-0 py-[5px] text-white bg-overlay flex items-center justify-between px-1 gap-x-[2px]">
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
      <div>
        <ComicTitle className="my-1" href={`${PATH.comic}/${comic.slug}`}>
          {comic.title}
        </ComicTitle>
        <ComicChapters chapters={comic.chapters} />
      </div>
    </div>
  );
};

export default ComicItem;
