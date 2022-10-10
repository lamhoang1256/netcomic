import { ICategory, IComic, IPagination } from "@types";
import axios from "axios";
import { CategorySidebar } from "components/category";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { ComicGrid, ComicItem } from "modules/comic";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface SearchPageProps {
  results: IComic[];
  paginations: IPagination[];
  categories: ICategory[];
}

const SearchPage = ({ results, paginations, categories }: SearchPageProps) => {
  return (
    <>
      <Head>
        <title>Thể loại - NetComic</title>
        <meta name="description" content="Thể loại - NetComic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <div className="bg-white layout-container">
          <div className="flex flex-col gap-4 mt-6 lg:flex-row">
            <div className="lg:w-2/3">
              <h2 className="pt-4 pb-1 text-2xl text-center">Tìm truyện tranh</h2>
              <ComicGrid className="mt-[10px]">
                {results.map((comic) => (
                  <ComicItem comic={comic} key={comic.slug} />
                ))}
              </ComicGrid>
              <Pagination paginations={paginations} />
            </div>
            <div className="flex flex-col lg:w-1/3 gap-y-4">
              <CategorySidebar />
            </div>
          </div>
        </div>
      </LayoutHome>
    </>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { results, paginations, categories } = (
    await axios.get(`${server}/api/search`, { params: query })
  ).data.data;
  return {
    props: {
      paginations,
      results,
      categories,
    },
  };
};

export default SearchPage;