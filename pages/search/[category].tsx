import { ICategory, ICategoryInfo, IComic, IComicOption, IPagination } from "@types";
import axios from "axios";
import { CategorySidebar } from "components/category";
import { FilterStatusCate } from "components/filter";
import { IconRefresh } from "components/icons";
import { CustomLink } from "components/link";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import { PATH } from "constants/path";
import LayoutHome from "layouts/LayoutHome";
import { ComicGrid, ComicItem } from "modules/comic";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface CategoryPageProps {
  info: ICategoryInfo;
  results: IComic[];
  paginations: IPagination[];
  categories: ICategory[];
  status: IComicOption[];
  sort: IComicOption[];
}

const CategoryPage = ({
  info,
  results,
  paginations,
  categories,
  sort,
  status,
}: CategoryPageProps) => {
  return (
    <>
      <Head>
        <title>{info.name} - NetComic</title>
        <meta name="description" content={`${info.name} - NetComic`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <div className="bg-white layout-container">
          <h1 className="pt-4 pb-1 text-2xl text-center">
            Truyện thể loại <span className="font-semibold text-rede5">{info.name}</span>
          </h1>
          <div className="flex flex-col gap-4 mt-3 lg:flex-row">
            <div className="lg:w-2/3">
              <div className="border border-graydd p-[10px] mb-3 rounded">{info.description}</div>
              <div className="grid gap-2 filter-grid filter">
                <FilterStatusCate options={status} placeholder="Tình trạng" />
                <FilterStatusCate options={sort} placeholder="Sắp xếp theo" />
                <CustomLink
                  href={PATH.search}
                  className="bg-[#337ab7] h-[38px] inline-flex items-center rounded gap-x-1 px-4 text-white"
                >
                  <IconRefresh />
                  <span>Reset</span>
                </CustomLink>
              </div>
              <ComicGrid className="mt-4">
                {results.map((comic) => (
                  <ComicItem comic={comic} key={comic.slug} />
                ))}
              </ComicGrid>
              <Pagination paginations={paginations} />
            </div>
            <div className="flex flex-col lg:w-1/3 gap-y-4">
              <CategorySidebar categories={categories} />
            </div>
          </div>
        </div>
      </LayoutHome>
    </>
  );
};

export const getServerSideProps = async ({ query, params }: GetServerSidePropsContext) => {
  const category = params?.category as string;
  const { info, results, paginations, categories, sort, status } = (
    await axios.get(`${server}/api/search/${category}`, { params: query })
  ).data.data;
  return {
    props: {
      info,
      results,
      paginations,
      categories,
      sort,
      status,
    },
  };
};

export default CategoryPage;
