import { IComic } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import { formatView, removeDotRegex } from "utils";
import catchAsync from "utils/catchAsync";
import { ApiError, responseError, responseSuccess } from "utils/response";

const ComicFollowApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { slug } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlComicDetails(`${PATH.nhatTruyenComic}/${slug}`);
  const response = {
    message: "Lấy chi tiết truyện thành công!",
    data,
  };
  responseSuccess(res, response);
};

const urlWithoutHttp = PATH.nhatTruyen.split("http:")[1] as string;
async function crawlComicDetails(url: string) {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  let comic: IComic = {} as IComic;
  comic.chapters = [];
  $("#ctl00_divCenter").each(function (index, element) {
    comic.title = $(element).find(".title-detail").text();
    comic.posterUrl = $(element)
      .find(".col-image img")
      .attr("src")
      ?.replace(urlWithoutHttp, PATH.nhatTruyen) as string;
    const slugHasId = $(element)
      .find(".col-info .mrb10 a")
      .attr("href")
      ?.replace(`${PATH.nhatTruyenComic}/`, "") as string;
    const slugArray = slugHasId?.split("-");
    slugArray.pop();
    comic.slug = slugArray.join("-");
    comic.viewCount = formatView(
      removeDotRegex($(element).find(".list-info .col-xs-8").last().text())
    );
    comic.commentCount = formatView(
      removeDotRegex($(element).find(".comment-count").last().text())
    );
    comic.followCount = formatView(removeDotRegex($(element).find(".follow span b").text()));
  });
  $("#ctl00_divCenter .list-chapter li.row").each(function (index, element) {
    const href = $(element)
      .find(".chapter a")
      .attr("href")
      ?.replace(`${PATH.nhatTruyenComic}/`, "") as string;
    const id = href?.split("/")?.slice(-1)[0];
    const name = $(element).find(".chapter a").text();
    const updatedAgo = $(element).find(".col-xs-4").text();
    comic.chapters.length >= 3
      ? comic.chapters
      : comic.chapters.push({ id, href, name, updatedAgo });
  });
  return comic;
}

export default catchAsync(ComicFollowApi);
