import { ICategory, ICategoryInfo, IComic, IPagination } from "@types";
import axios from "axios";
import { CategorySidebar } from "components/category";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import { PATH } from "constants/path";
import LayoutHome from "layouts/LayoutHome";
import { ComicGrid, ComicItem } from "modules/comic";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";

interface CategoryPageProps {
  info: ICategoryInfo;
  results: IComic[];
  paginations: IPagination[];
  categories: ICategory[];
}

const CategoryPage = ({ info, results, paginations, categories }: CategoryPageProps) => {
  return (
    <>
      <Head>
        <title>{info.name} - NetComic</title>
        <meta name="description" content={`${info.name} - NetComic`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <div className="bg-white layout-container">
          <div className="flex flex-col gap-4 mt-6 lg:flex-row">
            <div className="lg:w-2/3">
              <h2 className="pt-4 pb-1 text-2xl text-center">
                Truyện thể loại <span className="font-semibold text-rede5">{info.name}</span>
              </h2>
              <div className="border border-graydd p-[10px] mt-[10px] mb-4 rounded">
                {info.description}
              </div>
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

export const getServerSideProps = async ({ query, params }: GetServerSidePropsContext) => {
  const category = params?.category as string;
  const { info, results, paginations, categories } = (
    await axios.get(`${server}/api/search/${category}`, { params: query })
  ).data.data;
  return {
    props: {
      info,
      results,
      paginations,
      categories,
    },
  };
};

export default CategoryPage;
