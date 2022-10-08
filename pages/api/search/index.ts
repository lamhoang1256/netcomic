import axios from "axios";
import * as cheerio from "cheerio";
import { ICategory, IComic, IPagination, IQueryParams } from "@types";
import type { NextApiRequest, NextApiResponse } from "next";
import { crawlCategory, crawlComic, crawlPagination } from "utils/crawl";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { STATUS } from "constants/status";
import { PATH } from "constants/path";

const SearchComicsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlSearchComics(query);
  const response = {
    message: "Tìm truyện thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function crawlSearchComics(query: Partial<IQueryParams>) {
  const response = await axios.get(PATH.netTruyenSearch as string, { params: query });
  const html = response.data;
  const $ = cheerio.load(html);
  let results: IComic[] = [];
  let paginations: IPagination[] = [];
  let categories: ICategory[] = [];
  $("#ctl00_divCenter .Module .items .item").each(function (index, element) {
    const result = crawlComic($(element), $);
    results.push(result);
  });
  $("#ctl00_divCenter .pagination li", html).each(function (index, element) {
    const pagination = crawlPagination($(element), PATH.netTruyenCategory);
    paginations.push(pagination);
  });
  $("#ctl00_divRight .nav li a", html).each(function (index, element) {
    const category = crawlCategory($(element));
    categories.push(category);
  });
  return { results, paginations, categories };
}

export default catchAsync(SearchComicsApi);
