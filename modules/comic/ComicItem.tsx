import { IComic, IComicHistory } from "@types";
import { IconChat, IconEye, IconHeart } from "components/icons";
import { CustomLink } from "components/link";
import { LocalStorage } from "constants/localStorage";
import { PATH } from "constants/path";
import { useEffect, useState } from "react";
import ComicChapters from "./parts/ComicChapters";
import ComicImage from "./parts/ComicImage";
import ComicTitle from "./parts/ComicTitle";

interface ComicItemProps {
  comic: IComic;
}

const ComicItem = ({ comic }: ComicItemProps) => {
  console.log("comic: ", comic);
  const [history, setHistory] = useState<IComicHistory[]>([]);
  const comicInHistory = history.find((h) => h.title === comic.title);
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history") || "[]"));
  }, []);
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
      <ComicTitle className="my-1" href={`${PATH.comic}/${comic.slug}`}>
        {comic.title}
      </ComicTitle>
      <ComicChapters chapters={comic.chapters} comicInHistory={comicInHistory} />
      {/* {comic.chapters?.map((chapter, index) => (
        <div className="flex items-center justify-between mt-[2px]" key={index}>
          <ComicTitle className="!text-[13px]" href={`${PATH.comic}/${chapter.href}`}>
            {chapter.name}
          </ComicTitle>
          <span className="text-[11px] text-[#c0c0c0] italic">{chapter.updatedAgo}</span>
        </div>
      ))} */}
    </div>
  );
};

export default ComicItem;
