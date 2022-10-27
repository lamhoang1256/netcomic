import { IComicChartRanking } from "@types";
import axios from "axios";
import { IconEye } from "components/icons";
import { CustomLink } from "components/link";
import { server } from "configs/server";
import { PATH } from "constants/path";
import { useEffect, useState } from "react";

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
    <div className="border rounded border-graydd">
      <div className="flex items-center">
        <CustomLink
          href="/"
          className="bg-[#f9f9f9] dark:text-blue1c dark:bg-dark42 w-1/3 h-[42px] text-center border-r border-graydd border-t-2 border-t-[#721799] leading-[42px]"
        >
          Top Tháng
        </CustomLink>
        <CustomLink className="bg-[#ecf0f1] dark:bg-dark42 w-1/3 h-[42px] text-center leading-[42px]">
          Top Tuần
        </CustomLink>
        <CustomLink className="bg-[#ecf0f1] dark:bg-dark42 w-1/3 h-[42px] text-center leading-[42px]">
          Top Ngày
        </CustomLink>
      </div>
      <div className="px-[10px]">
        {chartRankings.map((comic) => (
          <div
            key={comic.href}
            className="flex items-center gap-x-[10px] py-[10px] border-b border-[#dedede]"
          >
            <span className="text-xl w-7">{comic.rank}</span>
            <picture>
              <source srcSet={comic.posterUrl} type="image/webp" />
              <img
                alt={comic.title}
                src={comic.posterUrl}
                className="w-[55px] border border-graydd h-[45px] object-cover object-top"
              />
            </picture>
            <div className="flex-1">
              <CustomLink
                href={`${PATH.comic}/${comic.href}`}
                className="transition-all duration-200 line-clamp-1 hover:text-blue29"
              >
                {comic.title}
              </CustomLink>
              <div className="flex items-center justify-between mt-2">
                <CustomLink href={`${PATH.comic}/${comic.newestHref}`} className="text-[13px]">
                  {comic.newestChapter}
                </CustomLink>
                <div className="flex items-center text-[#666] dark:text-[#c0c0c0] text-xs gap-x-1 italic">
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
