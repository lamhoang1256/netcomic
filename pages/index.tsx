import axios from "axios";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { HomeBanner, HomeNewestComic, HomeTopComic } from "modules/home";
import type { NextPage } from "next";
import Head from "next/head";
import { IBanner, IComic, IDataHomePage, IPagination } from "types";

interface HomePageProps {
  banners: IComic[];
  featuredComics: IComic[];
  newestComics: IComic[];
  pagination: IPagination[];
}

const Home = ({ banners, featuredComics, newestComics, pagination }: HomePageProps) => {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <div className="max-w-[1030px] py-[15px] bg-[#f9f9f9] mx-auto">
          <HomeBanner banners={banners} />
          <div className="flex mt-6">
            <HomeNewestComic newestComics={newestComics} pagination={pagination} />
            <HomeTopComic />
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
      featuredComics: data.featuredComics,
      newestComics: data.newestComics,
      pagination: data.pagination,
    },
  };
}

export default Home;
