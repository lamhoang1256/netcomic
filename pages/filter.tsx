import { IComic, IFilters, IPagination } from "@types";
import axios from "axios";
import { FilterMultiple, FilterOne } from "components/filter";
import { IconRefresh } from "components/icons";
import { CustomLink } from "components/link";
import { Meta } from "components/meta";
import { Pagination } from "components/pagination";
import { server } from "configs/server";
import { PATH } from "constants/path";
import LayoutHome from "layouts/LayoutHome";
import { ComicGrid, ComicItem } from "modules/comic";
import { GetServerSidePropsContext } from "next";

interface FilterPageProps {
  results: IComic[];
  paginations: IPagination[];
  filters: IFilters;
}

const FilterPage = ({ results, paginations, filters }: FilterPageProps) => {
  return (
    <>
      <Meta
        title="Tìm truyện nâng cao - NetComic"
        description="Tìm truyện - Web đọc truyện tranh online lớn nhất - Truyện tranh hay nhất, chất lượng được cập nhật liên tục mỗi ngày"
        image="https://i.ibb.co/VMC8pDm/preview.png"
      />
      <LayoutHome>
        <div className="bg-white rounded layout-container">
          <h2 className="pt-4 pb-1 text-2xl text-center">Tìm truyện nâng cao</h2>
          <div className="items-center gap-2 mt-3 mb-2 md:flex">
            <div className="grid flex-1 grid-cols-5 gap-2 filter-grid filter">
              <FilterMultiple genres={filters.genres} />
              <FilterOne
                keyFilter="minchapter"
                options={filters.minchapter}
                placeholder="Số lượng chapter"
              />
              <FilterOne keyFilter="status" options={filters.status} placeholder="Tình trạng" />
              <FilterOne keyFilter="gender" options={filters.gender} placeholder="Dành theo" />
              <FilterOne keyFilter="sort" options={filters.sort} placeholder="Sắp xếp theo" />
            </div>
            <CustomLink
              href={PATH.filter}
              className="bg-[#337ab7] h-9 inline-flex items-center rounded gap-x-1 px-4 text-white"
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
