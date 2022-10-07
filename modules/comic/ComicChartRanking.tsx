import axios from "axios";
import { IconEye } from "components/icons";
import { server } from "configs/server";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IComicChartRanking } from "@types";
import { PATH } from "constants/path";

const ComicChartRanking = () => {
  const [chartRankings, setChartRankings] = useState<IComicChartRanking[]>([]);
  const fetchChartRankings = async () => {
    try {
      const { data } = (await axios.get(`${server}/api/chart-rankings`)).data;
      setChartRankings(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    fetchChartRankings();
  }, []);

  return (
    <div className="border border-graydd">
      <div className="flex items-center">
        <Link href="/">
          <a className="bg-[#f9f9f9] w-1/3 h-[42px] text-center border-r border-graydd border-t-2 border-t-[#721799] leading-[42px]">
            Top Tháng
          </a>
        </Link>
        <Link href="/">
          <a className="bg-[#ecf0f1] w-1/3 h-[42px] text-center leading-[42px]">Top Tuần</a>
        </Link>
        <Link href="/">
          <a className="bg-[#ecf0f1] w-1/3 h-[42px] text-center leading-[42px]">Top Ngày</a>
        </Link>
      </div>
      <div className="px-[10px]">
        {chartRankings.map((comic) => (
          <div
            className="flex items-center gap-x-[10px] py-[10px] border-b border-[#dedede]"
            key={comic.view}
          >
            <span className="text-xl">{comic.rank}</span>
            <picture>
              <source srcSet={comic.posterUrl} type="image/webp" />
              <img
                alt={comic.title}
                src={comic.posterUrl}
                className="w-[55px] h-[45px] object-cover object-top"
              />
            </picture>
            <div className="flex-1">
              <Link href={`${PATH.comic}/${comic.href}`}>
                <a className="transition-all duration-200 line-clamp-1 hover:text-blue29">
                  {comic.title}
                </a>
              </Link>
              <div className="flex items-center justify-between mt-2">
                <Link href={`${PATH.comic}/${comic.newestHref}`}>
                  <a className="text-[13px]">{comic.newestChapter}</a>
                </Link>
                <div className="flex items-center text-[#666] text-xs gap-x-1 italic">
                  <IconEye />
                  <span>{comic.view}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicChartRanking;
