import { ICategory, IComic, IPagination } from "@types";
import axios from "axios";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { HomeBanner, HomeCategory, HomeNewestComic } from "modules/home";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface GirlComicPageProps {
  banners: IComic[];
  categories: ICategory[];
  newestComics: IComic[];
  paginations: IPagination[];
}

const GirlComicPage = ({ banners, categories, newestComics, paginations }: GirlComicPageProps) => {
  return (
    <LayoutHome>
      <Head>
        <title>Truyện con gái - NetComic</title>
        <meta name="description" content="Truyện con gái - NetComic" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-white rounded-lg dark:bg-bgdark layout-container">
        <HomeBanner banners={banners} />
        <HomeCategory categories={categories} />
        <HomeNewestComic title="Truyện con gái" newestComics={newestComics} />
        <Pagination paginations={paginations} />
      </div>
    </LayoutHome>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = (await axios.get(`${server}/api/girl`, { params: query })).data;
  return {
    props: {
      banners: data.banners,
      categories: data.categories,
      newestComics: data.newestComics,
      paginations: data.paginations,
    },
  };
};

export default GirlComicPage;
