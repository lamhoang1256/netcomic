import { IComic } from "@types";
import axios from "axios";
import { Button } from "components/button";
import { IconRandom } from "components/icons";
import { Meta } from "components/meta";
import { server } from "configs/server";
import { PATH } from "constants/path";
import LayoutHome from "layouts/LayoutHome";
import { ComicGrid, ComicItem } from "modules/comic";
import { GetServerSidePropsContext } from "next";

interface RandomComicPageProps {
  comics: IComic[];
}

const RandomComicPage = ({ comics }: RandomComicPageProps) => {
  return (
    <>
      <Meta
        title="Random truyện - NetComic"
        description="Random truyện"
        image="https://raw.githubusercontent.com/lamhoang1256/shopbee/main/screenshots/thumbnail-youtube.png"
      />
      <LayoutHome>
        <div className="bg-white rounded-lg dark:bg-bgdark layout-container">
          <h2 className="pt-3 text-2xl text-center">Random truyện</h2>
          <Button
            to={PATH.random}
            className="flex items-center mx-auto my-3 text-white gap-x-[6px] bg-blue33"
          >
            <IconRandom fill="#fff" className="!w-[14px] !h-[14px]" />
            <span>Làm mới</span>
          </Button>
          <ComicGrid className="mt-4">
            {comics.map((comic) => (
              <ComicItem comic={comic} key={comic.slug} />
            ))}
          </ComicGrid>
          <Button
            to={PATH.random}
            className="flex items-center mx-auto mt-4 text-white gap-x-[6px] bg-blue33"
          >
            <IconRandom fill="#fff" className="!w-[14px] !h-[14px]" />
            <span>Làm mới</span>
          </Button>
        </div>
      </LayoutHome>
    </>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data: comics } = (await axios.get(`${server}/api/random`, { params: query })).data;
  return {
    props: {
      comics,
    },
  };
};

export default RandomComicPage;
