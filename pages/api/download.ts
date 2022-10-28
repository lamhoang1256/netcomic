import axios from "axios";
import * as cheerio from "cheerio";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { ApiError, responseError, responseSuccess } from "utils/response";

const DownloadApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await handleDownload();
  const response = {
    message: "Download thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function handleDownload() {
  const response = await axios.get(
    "https://nhattruyenin.com/truyen-tranh/dai-quan-gia-la-ma-hoang/chap-330/919114"
  );
  const html = response.data;
  const $ = cheerio.load(html);
  let images: string[] = [];
  $(".reading-detail .page-chapter").each(function (index, element) {
    const image = $(element).find("img").attr("data-original") as string;
    images.push(image);
  });
  return images;
}

export default catchAsync(DownloadApi);
