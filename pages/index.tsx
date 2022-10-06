import axios from "axios";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { ComicChartRanking } from "modules/comic";
import { HomeBanner, HomeFollow, HomeHistory, HomeNewestComic } from "modules/home";
import Head from "next/head";
import { IComic, IPagination } from "@types";

interface HomePageProps {
  banners: IComic[];
  newestComics: IComic[];
  paginations: IPagination[];
}

const HomePage = ({ banners, newestComics, paginations }: HomePageProps) => {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
        <meta name="description" content="Trang chủ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <div className="bg-white layout-container">
          <HomeBanner banners={banners} />
          <div className="flex flex-col gap-4 mt-6 lg:flex-row">
            <div className="lg:w-2/3">
              <HomeNewestComic newestComics={newestComics} />
              <Pagination paginations={paginations} />
            </div>
            <div className="flex flex-col lg:w-1/3 gap-y-4">
              <HomeFollow />
              <HomeHistory />
              <ComicChartRanking />
            </div>
          </div>
        </div>
      </LayoutHome>
    </>
  );
};

export async function getStaticProps() {
  const { data } = (await axios.get(`${server}/api/home`)).data;
  return {
    props: {
      banners: data.banners,
      newestComics: data.newestComics,
      paginations: data.paginations,
    },
  };
}

export default HomePage;
