import { ICategory, IComic, IComicOption, IPagination } from "@types";
import axios from "axios";
import { CategorySidebar } from "components/category";
import { FilterStatus } from "components/filter";
import { IconRefresh } from "components/icons";
import { CustomLink } from "components/link";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import { PATH } from "constants/path";
import LayoutHome from "layouts/LayoutHome";
import { ComicGrid, ComicItem } from "modules/comic";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface SearchPageProps {
  results: IComic[];
  paginations: IPagination[];
  categories: ICategory[];
  status: IComicOption[];
  sort: IComicOption[];
}

const SearchPage = ({ results, paginations, categories, status, sort }: SearchPageProps) => {
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
              <div className="grid gap-2 mt-2 filter-grid filter">
                <FilterStatus options={status} placeholder="Tình trạng" />
                <FilterStatus options={sort} placeholder="Sắp xếp theo" />
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

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { results, paginations, categories, sort, status } = (
    await axios.get(`${server}/api/search`, { params: query })
  ).data.data;
  return {
    props: {
      paginations,
      results,
      categories,
      sort,
      status,
    },
  };
};

export default SearchPage;
