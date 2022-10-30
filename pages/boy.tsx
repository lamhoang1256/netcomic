import { ICategory, IComic, IPagination } from "@types";
import axios from "axios";
import { Meta } from "components/meta";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { HomeBanner, HomeCategory, HomeNewestComic } from "modules/home";
import { GetServerSidePropsContext } from "next";

interface BoyComicPageProps {
  banners: IComic[];
  newestComics: IComic[];
  paginations: IPagination[];
  categories: ICategory[];
}

const BoyComicPage = ({ banners, newestComics, paginations, categories }: BoyComicPageProps) => {
  return (
    <>
      <Meta
        title="Truyện tranh con trai - NetComic"
        description="Truyện tranh dành cho nam, nội dung thường liên quan đến bạo lực, đánh nhau, phiêu lưu, kinh dị,.."
        image="https://raw.githubusercontent.com/lamhoang1256/shopbee/main/screenshots/thumbnail-youtube.png"
      />
      <LayoutHome>
        <div className="bg-white rounded-lg dark:bg-bgdark layout-container">
          <HomeBanner banners={banners} />
          <HomeCategory categories={categories} />
          <HomeNewestComic title="Truyện con trai" newestComics={newestComics} />
          <Pagination paginations={paginations} />
        </div>
      </LayoutHome>
    </>
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
