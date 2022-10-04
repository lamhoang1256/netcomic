import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import { IQueryParams } from "types/common";
import { IDataTopComics } from "types/top-comic";
import catchAsync from "utils/catch-async";
import { crawlComic } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const getTopComics = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const url = query?.full ? (PATH.netTruyenFull as string) : (PATH.netTruyen as string);
  const data = await crawlTopComics(url, query);
  const response = {
    message: "Lấy truyện top xếp hạng thành công!",
    data,
  };
  responseSuccess(res, response);
};

const crawlTopComics = async (url: string, query: Partial<IQueryParams>) => {
  const response = await axios.get(url, { params: query });
  const html = response.data;
  const $ = cheerio.load(html);
  let topComicResults: IDataTopComics = { status: [], sort: [], results: [] };
  $("#ctl00_mainContent_ctl00_ulStatus li").each(function (index, element) {
    const active = $(element).hasClass("active");
    const option = getComicOptions($(element).find("a"));
    topComicResults.status.push({ active, ...option });
  });
  $("#ctl00_mainContent_ctl00_divSort .ajaxlink").each(function (index, element) {
    const active = $(element).hasClass("active");
    const option = getComicOptions($(element));
    topComicResults.sort.push({ active, ...option });
  });
  $(".ModuleContent .item").each(function (index, element) {
    const comic = crawlComic($(element));
    topComicResults.results.push(comic);
  });
  return topComicResults;
};

const getComicOptions = (node: any) => {
  const title = node.text();
  const href =
    node
      .attr("href")
      ?.replace(PATH.netTruyen as string, "")
      ?.replace(PATH.netTruyenFull as string, "top-comic?full=true") || PATH.topComic;
  return { title, href };
};

export default catchAsync(getTopComics);
