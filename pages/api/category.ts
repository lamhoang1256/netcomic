import { ICategory, IQueryParams } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import axiosNhattruyen from "configs/axiosNhattruyen";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import { crawlCategory } from "libs/cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { ApiError, responseError, responseSuccess } from "utils/response";

const GetCategoriesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlCategories(query);
  const response = {
    message: "Lấy danh sách thể loại thành công!",
    data
  };
  responseSuccess(res, response);
};

export async function crawlCategories(query: Partial<IQueryParams>) {
  const response = await axiosNhattruyen.get(PATH.nhatTruyenCategory);
  const html = response.data;
  const $ = cheerio.load(html);
  let categories: ICategory[] = [];
  $("#ctl00_divRight .nav li a", html).each(function (index, element) {
    const category = crawlCategory($(element));
    categories.push(category);
  });
  return categories;
}

export default catchAsync(GetCategoriesApi);

/** Lấy danh sách thể loại
 * @swagger
 * /category:
 *  get:
 *      summary: Lấy danh sách thể loại
 *      tags: [Category]
 *      responses:
 *          200:
 *            description: Success
 */
