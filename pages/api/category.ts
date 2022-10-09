import { ICategory, IQueryParams } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { crawlCategory } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const GetCategoryListApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlSearchComics(query);
  const response = {
    message: "Lấy danh sách thể loại thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function crawlSearchComics(query: Partial<IQueryParams>) {
  const response = await axios.get(`${PATH.netTruyenSearch}`, {
    params: query,
  });
  const html = response.data;
  const $ = cheerio.load(html);
  let categories: ICategory[] = [];
  $("#ctl00_divRight .nav li a", html).each(function (index, element) {
    const category = crawlCategory($(element));
    categories.push(category);
  });
  return categories;
}

export default catchAsync(GetCategoryListApi);
