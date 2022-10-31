import axios from "axios";
import * as cheerio from "cheerio";
import { ICategory, IComic, IComicOption, IPagination, IQueryParams } from "@types";
import type { NextApiRequest, NextApiResponse } from "next";
import { crawlCategory, crawlComic, crawlPagination, getComicOptions } from "utils/crawl";
import catchAsync from "utils/catchAsync";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { STATUS } from "constants/status";
import { PATH } from "constants/path";

const SearchComicsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlCategories(query);
  const response = {
    message: "Tìm truyện thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function crawlCategories(query: Partial<IQueryParams>) {
  const response = await axios.get(PATH.nhatTruyenSearch as string, { params: query });
  const html = response.data;
  const $ = cheerio.load(html);
  const response2 = await axios.get(PATH.nhatTruyenSearch);
  const html2 = response2.data;
  const $2 = cheerio.load(html2);
  let results: IComic[] = [];
  let status: IComicOption[] = [];
  let sort: IComicOption[] = [];
  let paginations: IPagination[] = [];
  let categories: ICategory[] = [];
  $2("#ctl00_mainContent_ctl00_ulStatus li").each(function (index, element) {
    const active = $2(element).hasClass("active");
    const option = getComicOptions($2(element).find("a"));
    status.push({ active, ...option });
  });
  $2("#ctl00_mainContent_ctl00_divSort .ajaxlink").each(function (index, element) {
    const active = $2(element).hasClass("active");
    const option = getComicOptions($2(element));
    sort.push({ active, ...option });
  });
  $("#ctl00_divCenter .Module .items .item").each(function (index, element) {
    const result = crawlComic($(element), $);
    results.push(result);
  });
  $("#ctl00_divCenter .pagination li", html).each(function (index, element) {
    const pagination = crawlPagination($(element), PATH.nhatTruyenCategory);
    paginations.push(pagination);
  });
  $("#ctl00_divRight .nav li a", html).each(function (index, element) {
    const category = crawlCategory($(element));
    categories.push(category);
  });
  return { results, paginations, categories, status, sort };
}

export default catchAsync(SearchComicsApi);
