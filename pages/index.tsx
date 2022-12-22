import { IComic, IPagination } from "@types";
import axios from "axios";
import { Meta } from "components/meta";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { HomeBanner, HomeNewestComic } from "modules/home";
import { GetServerSidePropsContext } from "next";

interface HomePageProps {
  banners: IComic[];
  newestComics: IComic[];
  paginations: IPagination[];
  // categories: ICategory[];
}

const HomePage = ({ banners, newestComics, paginations }: HomePageProps) => {
  return (
    <>
      <Meta />
      <LayoutHome>
        <div className="bg-white rounded-lg dark:bg-bgdark layout-container">
          <HomeBanner banners={banners} />
          {/* <HomeCategory categories={categories} /> */}
          <HomeNewestComic newestComics={newestComics} />
          <Pagination paginations={paginations} />
        </div>
      </LayoutHome>
    </>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = (await axios.get(`${server}/api/home`, { params: query })).data;
  return {
    props: {
      banners: data.banners,
      newestComics: data.newestComics,
      paginations: data.paginations
      // categories: data.categories
    }
  };
};

export default HomePage;
