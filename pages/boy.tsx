import { ICategory, IComic, IPagination } from "@types";
import axios from "axios";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { HomeBanner, HomeCategory, HomeNewestComic } from "modules/home";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface BoyComicPageProps {
  banners: IComic[];
  newestComics: IComic[];
  paginations: IPagination[];
  categories: ICategory[];
}

const BoyComicPage = ({ banners, newestComics, paginations, categories }: BoyComicPageProps) => {
  return (
    <LayoutHome>
      <Head>
        <title>Truyện Con Trai - NetComic</title>
        <meta name="description" content="Truyện Con Trai - NetComic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white rounded-lg dark:bg-bgdark layout-container">
        <HomeBanner banners={banners} />
        <HomeCategory categories={categories} />
        <HomeNewestComic title="Truyện con trai" newestComics={newestComics} />
        <Pagination paginations={paginations} />
      </div>
    </LayoutHome>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = (await axios.get(`${server}/api/boy`, { params: query })).data;
  return {
    props: {
      banners: data.banners,
      categories: data.categories,
      newestComics: data.newestComics,
      paginations: data.paginations,
    },
  };
};

export default BoyComicPage;
