import { IQueryParams } from "@types";
import axiosClient from "configs/axiosClient";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { crawlGenderComics } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const BoyComicsApi = async (req: NextApiRequest, res: NextApiResponse) => {
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
  const response = await axiosClient.get(PATH.nhatTruyenBoy, { params: query });
  const html = response.data;
  const data = crawlGenderComics(html);
  return data;
}

export default catchAsync(BoyComicsApi);
