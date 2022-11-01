import axios from "axios";
import * as cheerio from "cheerio";
import { ICategory, ICategoryInfo, IComic, IComicOption, IPagination, IQueryParams } from "@types";
import type { NextApiRequest, NextApiResponse } from "next";
import { crawlCategory, crawlComic, crawlPagination, getComicOptions } from "libs/cheerio";
import catchAsync from "utils/catchAsync";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { STATUS } from "constants/status";
import { PATH } from "constants/path";

const SearchByCategoryApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlCategories(query);
  const response = {
    message: "Lấy truyện theo thể loại thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function crawlCategories(query: Partial<IQueryParams>) {
  const response = await axios.get(`${PATH.nhatTruyenCategory}/${query?.category}`, {
    params: query,
  });
  const html = response.data;
  const $ = cheerio.load(html);
  const response2 = await axios.get(PATH.nhatTruyenSearch);
  const html2 = response2.data;
  const $2 = cheerio.load(html2);
  let results: IComic[] = [];
  let info: ICategoryInfo = {} as ICategoryInfo;
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
  $("#ctl00_divCenter .Module .comic-filter", html).each(function (index, element) {
    info.name = $(element).find(".text-center strong").text();
    info.description = $(element).find(".description .info").text();
  });
  $("#ctl00_divCenter .Module .items .item").each(function (index, element) {
    const result = crawlComic($(element), $);
    results.push(result);
  });
  $("#ctl00_divCenter .pagination li", html).each(function (index, element) {
    const pagination = crawlPagination($(element), `${PATH.nhatTruyenCategory}/`);
    paginations.push(pagination);
  });
  $("#ctl00_divRight .nav li a", html).each(function (index, element) {
    const category = crawlCategory($(element));
    categories.push(category);
  });
  return { info, results, paginations, categories, status, sort };
}

export default catchAsync(SearchByCategoryApi);

/** Lấy truyện theo danh mục
 * @swagger
 * /search/{category}:
 *  get:
 *      summary: Lấy truyện theo danh mục
 *      tags: [Search]
 *      parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         example: action
 *         schema:
 *           type: string
 *           description: category
 *      responses:
 *          200:
 *              description: Success
 */
