import { IComic } from "@types";
import axios from "axios";
import { Button } from "components/button";
import { server } from "configs/server";
import { PATH } from "constants/path";
import LayoutHome from "layouts/LayoutHome";
import { ComicGrid, ComicItem } from "modules/comic";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface RandomComicPageProps {
  comics: IComic[];
}

const RandomComicPage = ({ comics }: RandomComicPageProps) => {
  return (
    <>
      <Head>
        <title>Random truyện</title>
        <meta name="description" content="Random truyện" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <div className="!py-4 bg-white rounded layout-container">
          <h2 className="pb-1 text-2xl text-center">Random truyện</h2>
          <Button to={PATH.random} className="block mx-auto my-2 text-white bg-blue33">
            Làm mới
          </Button>
          <ComicGrid className="mt-4">
            {comics.map((comic) => (
              <ComicItem comic={comic} key={comic.slug} />
            ))}
          </ComicGrid>
          <Button to={PATH.random} className="block mx-auto mt-4 text-white bg-blue33">
            Làm mới
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
