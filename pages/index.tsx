import axios from "axios";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { HomeBanner, HomeNewestComic, HomeFollow, HomeHistory } from "modules/home";
import Head from "next/head";
import { IComic, IPagination } from "types";

interface HomePageProps {
  banners: IComic[];
  newestComics: IComic[];
  pagination: IPagination[];
}

const Home = ({ banners, newestComics, pagination }: HomePageProps) => {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
        <meta name="description" content="Trang chủ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <div className="max-w-[1030px] py-[15px] bg-[#f9f9f9] mx-auto">
          <HomeBanner banners={banners} />
          <div className="flex gap-4 mt-6 px-[15px]">
            <HomeNewestComic newestComics={newestComics} pagination={pagination} />
            <div className="flex flex-col w-1/3 gap-y-4">
              <HomeFollow />
              <HomeHistory />
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
      pagination: data.pagination,
    },
  };
}

export default Home;
