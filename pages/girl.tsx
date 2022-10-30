import { ICategory, IComic, IPagination } from "@types";
import axios from "axios";
import { Meta } from "components/meta";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { HomeBanner, HomeCategory, HomeNewestComic } from "modules/home";
import { GetServerSidePropsContext } from "next";

interface GirlComicPageProps {
  banners: IComic[];
  categories: ICategory[];
  newestComics: IComic[];
  paginations: IPagination[];
}

const GirlComicPage = ({ banners, categories, newestComics, paginations }: GirlComicPageProps) => {
  return (
    <>
      <Meta
        title="Truyện tranh con gái, tình cảm & lãng mạn - NetComic"
        description="Truyện tranh dành cho phái nữ, nội dung thường liên quan đến tình cảm, lãng mạn, có nhiều cung bậc cảm xúc trong tình yêu"
        image="https://raw.githubusercontent.com/lamhoang1256/shopbee/main/screenshots/thumbnail-youtube.png"
      />
      <LayoutHome>
        <div className="bg-white rounded-lg dark:bg-bgdark layout-container">
          <HomeBanner banners={banners} />
          <HomeCategory categories={categories} />
          <HomeNewestComic title="Truyện con gái" newestComics={newestComics} />
          <Pagination paginations={paginations} />
        </div>
      </LayoutHome>
    </>
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
