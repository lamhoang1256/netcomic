import axios from "axios";
import axiosClient from "configs/axiosClient";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import { IQueryParams } from "types/common";
import catchAsync from "utils/catch-async";
import { crawlGenderComics } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const getBoyComics = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlBoyComics(query);
  const response = {
    message: "Lấy truyện thể loại con trai thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function crawlBoyComics(query: Partial<IQueryParams>) {
  const response = await axiosClient.get(PATH.netTruyenBoy, { params: query });
  const html = response.data;
  const girlComics = crawlGenderComics(html);
  return girlComics;
}

export default catchAsync(getBoyComics);
