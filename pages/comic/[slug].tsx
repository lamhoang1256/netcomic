import LayoutHome from "layouts/LayoutHome";
import { ComicChartRanking } from "modules/comic";
import Head from "next/head";
import { IComic, IComicTopRanking, IPagination } from "types";

interface ComicDetailsPageProps {
  banners: IComic[];
  newestComics: IComic[];
  pagination: IPagination[];
  chartRankings: IComicTopRanking[];
}

const ComicDetailsPage = ({}: ComicDetailsPageProps) => {
  return (
    <>
      <Head>
        <title>Trang chi tiết truyện</title>
        <meta name="description" content="Trang chi tiết truyện" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <div className="max-w-[1030px] py-[15px] bg-white mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 px-[15px]">
            <div className="lg:w-2/3">
              <div className="text-center">
                <h1 className="text-[21px]">TOÀN CHỨC PHÁP SƯ</h1>
                <span className="inline-block mt-1 opacity-70 text-[13px] italic">
                  [Cập nhật lúc: 06:26 05/10/2022]
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:w-1/3 gap-y-4">
              <ComicChartRanking />
            </div>
          </div>
        </div>
      </LayoutHome>
    </>
  );
};

export default ComicDetailsPage;
