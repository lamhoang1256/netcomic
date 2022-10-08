import { ICategory, IComic, IPagination } from "@types";
import axios from "axios";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import { PATH } from "constants/path";
import LayoutHome from "layouts/LayoutHome";
import { ComicGrid, ComicItem } from "modules/comic";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";

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
              <ul className="grid grid-cols-2 p-3 border rounded gap-y-2 border-graydd">
                {categories.map((category) => (
                  <li key={category.display} className="border-b border-graydd">
                    <Link href={`${PATH.search}/${category.href}`}>
                      <a className="block py-1 transition-all duration-150 hover:text-rede5">
                        {category.display}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </LayoutHome>
    </>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  // const { data } = (await axios.get(`${server}/api/search`, { params: query })).data;
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
