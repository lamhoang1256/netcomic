import { IComicChartRanking, IQueryParams } from "@types";
import * as cheerio from "cheerio";
import axiosNhattruyen from "configs/axiosNhattruyen";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import { crawlComicTopMonth } from "libs/cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { ApiError, responseError, responseSuccess } from "utils/response";

const ChartRankingsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlChartRankings(query);
  const response = {
    message: "Lấy dữ liệu bảng xếp hạng thành công!",
    data
  };
  responseSuccess(res, response);
};

async function crawlChartRankings(query: Partial<IQueryParams>) {
  const response = await axiosNhattruyen(PATH.nhatTruyen, { params: query });
  const html = response.data;
  const $ = cheerio.load(html);
  let chartRankings: IComicChartRanking[] = [];
  $("#ctl00_divRight #topMonth li", html).each(function (index, element) {
    const comic = crawlComicTopMonth($(element));
    chartRankings.push(comic);
  });
  return chartRankings;
}

export default catchAsync(ChartRankingsApi);

/** Lấy bảng xếp hạng truyện
 * @swagger
 * /ranking:
 *  get:
 *      summary: Lấy bảng xếp hạng truyện
 *      tags: [Comic]
 *      responses:
 *          200:
 *            description: Success
 */
