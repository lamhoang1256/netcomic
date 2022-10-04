import axios from "axios";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import { IQueryParams } from "types/common";
import catchAsync from "utils/catch-async";
import { crawlGenderComics } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const getGrilComics = async (req: NextApiRequest, res: NextApiResponse) => {
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
  const response = await axios.get(PATH.netTruyenGirl as string, { params: query });
  const html = response.data;
  const girlComics = crawlGenderComics(html);
  return girlComics;
}

export default catchAsync(getGrilComics);
