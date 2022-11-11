import { IQueryParams } from "@types";
import axiosNhattruyen from "configs/axiosNhattruyen";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import { crawlGenderComics } from "libs/cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { ApiError, responseError, responseSuccess } from "utils/response";

const GrilComicsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlGrilComics(query);
  const response = {
    message: "Lấy truyện thể loại con gái thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function crawlGrilComics(query: Partial<IQueryParams>) {
  const response = await axiosNhattruyen(PATH.nhatTruyenGirl, { params: query });
  const html = response.data;
  const data = crawlGenderComics(html);
  return data;
}

export default catchAsync(GrilComicsApi);

/** Lấy truyện thể loại con gái
 * @swagger
 * /girl:
 *  get:
 *      summary: Lấy truyện thể loại con gái
 *      tags: [Category]
 *      responses:
 *          200:
 *            description: Success
 */
