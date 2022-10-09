import { IComic, IFilters, IPagination } from "@types";
import axios from "axios";
import { CategorySidebar } from "components/category";
import { Pagination } from "components/pagination";
import { SelectGenres } from "components/select";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { ComicGrid, ComicItem } from "modules/comic";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useState } from "react";

interface FilterPageProps {
  results: IComic[];
  paginations: IPagination[];
  filters: IFilters;
}

const FilterPage = ({ results, paginations, filters }: FilterPageProps) => {
  console.log("filters: ", filters);
  return (
    <>
      <Head>
        <title>Tìm truyện nâng cao</title>
        <meta name="description" content="Tìm truyện nâng cao" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <div className="bg-white rounded layout-container">
          <h2 className="pt-4 pb-1 text-2xl text-center">Tìm truyện nâng cao</h2>
          <div className="grid grid-cols-4 gap-2 filter">
            <SelectGenres genres={filters.genres} />
          </div>
          <ComicGrid className="mt-4">
            {results.map((comic) => (
              <ComicItem comic={comic} key={comic.slug} />
            ))}
          </ComicGrid>
          <Pagination paginations={paginations} className="pb-6" />
        </div>
      </LayoutHome>
    </>
  );
};

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { results, paginations, filters } = (
    await axios.get(`${server}/api/filter`, { params: query })
  ).data.data;
  return {
    props: {
      results,
      filters,
      paginations,
    },
  };
};

export default FilterPage;
