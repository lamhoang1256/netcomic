import { IconFilter } from "components/icons";
import { Heading } from "components/text";
import { ComicGrid, ComicItem } from "modules/comic";
import Link from "next/link";
import { IComic } from "@types";
import { PATH } from "constants/path";

interface HomeNewestComicProps {
  newestComics: IComic[];
}

const HomeNewestComic = ({ newestComics }: HomeNewestComicProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading className="text-xl">Truyện đề cử</Heading>
        <Link href={PATH.filter}>
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
