import { IBanner, IComic, IComicChartRanking, IPagination, IQueryParams } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { crawlBanner, crawlComic, crawlPagination, crawlComicTopMonth } from "libs/cheerio";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { crawlCategories } from "./category";

const HomePageApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlHomePage(query);
  const response = {
    message: "Lấy dữ liệu trang home thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function crawlHomePage(query: Partial<IQueryParams>) {
  const response = await axios.get(PATH.nhatTruyen as string, { params: query });
  const html = response.data;
  const $ = cheerio.load(html);
  let banners: IBanner[] = [];
  let newestComics: IComic[] = [];
  let paginations: IPagination[] = [];
  let chartRankings: IComicChartRanking[] = [];
  $("#ctl00_divAlt1 .items-slide .item", html).each(function (index, element) {
    const banner = crawlBanner($(element));
    banners.push(banner);
  });
  $("#ctl00_divCenter .ModuleContent .item", html).each(function (index, element) {
    const comic = crawlComic($(element), $);
    newestComics.push(comic);
  });
  $("#ctl00_divCenter .pagination li", html).each(function (index, element) {
    const pagination = crawlPagination($(element));
    paginations.push(pagination);
  });
  $("#ctl00_divRight #topMonth li", html).each(function (index, element) {
    const comic = crawlComicTopMonth($(element));
    chartRankings.push(comic);
  });
  const categories = await crawlCategories({});
  return { banners, newestComics, paginations, chartRankings, categories };
}

export default catchAsync(HomePageApi);
