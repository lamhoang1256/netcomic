import { IComic } from "@types";
import { IconFilter } from "components/icons";
import { CustomLink } from "components/link";
import { Heading } from "components/text";
import { PATH } from "constants/path";
import { ComicGrid, ComicItem } from "modules/comic";

interface HomeNewestComicProps {
  newestComics: IComic[];
}

const HomeNewestComic = ({ newestComics }: HomeNewestComicProps) => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <Heading className="text-xl">Truyện đề cử</Heading>
        <CustomLink
          href={PATH.filter}
          className="w-[30px] h-[30px] border border-[#ff9601] rounded-full flex items-center justify-center"
        >
          <IconFilter fill="#ff9601" />
        </CustomLink>
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
