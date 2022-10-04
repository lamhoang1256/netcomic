import axios from "axios";
import * as cheerio from "cheerio";
import { IComic } from "types/home";
import type { NextApiRequest, NextApiResponse } from "next";
import { crawlComic } from "utils/crawl";
import catchAsync from "utils/catch-async";
import { IQueryParams } from "types/common";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { STATUS } from "constants/status";
import { PATH } from "constants/path";

const searchComics = async (req: NextApiRequest, res: NextApiResponse) => {
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
  let searchResults: IComic[] = [];
  $("#ctl00_divCenter .Module .items .item").each(function (index, item) {
    const result = crawlComic($(item));
    searchResults.push(result);
  });
  return searchResults;
}

export default catchAsync(searchComics);
