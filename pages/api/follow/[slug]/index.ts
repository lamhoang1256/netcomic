import { IComicFollow } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { ApiError, responseError, responseSuccess } from "utils/response";

const ComicFollowDetailsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { slug } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlComicDetails(`${PATH.netTruyenComic}/${slug}`);
  const response = {
    message: "Lấy chi tiết truyện thành công!",
    data,
  };
  responseSuccess(res, response);
};

const urlWithoutHttp = PATH.netTruyen.split("http:")[1] as string;
async function crawlComicDetails(url: string) {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  let comic: IComicFollow = {} as IComicFollow;
  $("#ctl00_divCenter").each(function (index, element) {
    comic.title = $(element).find(".title-detail").text();
    comic.posterUrl = $(element)
      .find(".col-image img")
      .attr("src")
      ?.replace(urlWithoutHttp, PATH.netTruyen) as string;
    comic.slug = $(element)
      .find(".col-info .mrb10 a")
      .attr("href")
      ?.replace(`${PATH.netTruyenComic}/`, "") as string;
  });
  $("#ctl00_divCenter .list-chapter li.row")
    .first()
    .each(function (index, element) {
      comic.idNewChapter = $(element).find(".chapter a").attr("data-id") as string;
      comic.hrefNewChapter = $(element)
        .find(".chapter a")
        .attr("href")
        ?.replace(`${PATH.netTruyenComic}/`, "") as string;
      comic.newChapter = $(element).find(".chapter a").text();
      comic.updatedAt = $(element).find(".col-xs-4").text();
    });
  return comic;
}

export default catchAsync(ComicFollowDetailsApi);
