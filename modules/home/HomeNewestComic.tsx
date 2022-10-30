import { IComic } from "@types";
import { IconFilter, IconRandom } from "components/icons";
import { CustomLink } from "components/link";
import { Heading } from "components/text";
import { PATH } from "constants/path";
import { ComicGrid, ComicItem } from "modules/comic";

interface HomeNewestComicProps {
  title?: string;
  newestComics: IComic[];
}

const HomeNewestComic = ({ title = "Truyện mới cập nhật", newestComics }: HomeNewestComicProps) => {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <Heading className="text-xl">{title}</Heading>
        <div className="flex items-center gap-x-2">
          <CustomLink
            href={PATH.random}
            className="w-[30px] h-[30px] border border-[#ff9601] rounded-full flex items-center justify-center"
          >
            <IconRandom fill="#ff9601" />
          </CustomLink>
          <CustomLink
            href={PATH.filter}
            className="w-[30px] h-[30px] border border-[#ff9601] rounded-full flex items-center justify-center"
          >
            <IconFilter fill="#ff9601" />
          </CustomLink>
        </div>
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
