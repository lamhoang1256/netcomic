import { IComic, IComicHistory } from "@types";
import { CustomLink } from "components/link";
import { PATH } from "constants/path";
import { useEffect, useState } from "react";
import ComicAmount from "./parts/ComicAmount";
import ComicChapters from "./parts/ComicChapters";
import ComicImage from "./parts/ComicImage";
import ComicTitle from "./parts/ComicTitle";

interface ComicItemProps {
  comic: IComic;
}

const ComicItem = ({ comic }: ComicItemProps) => {
  const { slug, posterUrl, viewCount, title, followCount, commentCount, chapters } = comic;
  const [history, setHistory] = useState<IComicHistory[]>([]);
  const comicInHistory = history.find((h) => h.slug === slug);
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history") || "[]"));
  }, []);
  return (
    <div>
      <div className="relative overflow-hidden border border-graydd rounded aspect-[2.2/3]">
        <CustomLink href={`${PATH.comic}/${slug}`}>
          <ComicImage src={posterUrl} alt={slug} />
        </CustomLink>
        <ComicAmount view={viewCount} comment={commentCount} follow={followCount} />
      </div>
      <ComicTitle className="my-1" href={`${PATH.comic}/${slug}`}>
        {title}
      </ComicTitle>
      <ComicChapters chapters={chapters} comicInHistory={comicInHistory} />
    </div>
  );
};

export default ComicItem;
