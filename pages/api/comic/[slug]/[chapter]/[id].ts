import { IComment, IDetailsChapter, IImageReading } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { crawlComments, getImagesReading } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const crawlChapterComic = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { slug, chapter, id } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await getDetailsChapter(`${PATH.netTruyenComic}/${slug}/${chapter}/${id}`);
  const response = {
    message: "Lấy chi tiết chapter thành công!",
    data,
  };
  responseSuccess(res, response);
};

const getDetailsChapter = async (url: string) => {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  let imageUrls: IImageReading[] = [];
  let detailsChapter = {} as IDetailsChapter;
  let comments: IComment[] = [];
  $(".reading .container .top")
    .first()
    .each(function (index, item) {
      const originalUrl = PATH.netTruyen + "/";
      const heading = $(item).find("h1.txt-primary");
      const href = heading.find("a").attr("href")?.replace(originalUrl, "") as string;
      const title = heading.find("a").text();
      const chapter = heading.find("span").text();
      const updatedAt = $(item).find("i").text();
      detailsChapter = { title, updatedAt, chapter, href };
    });
  $(".reading-detail .page-chapter").each(function (index, element) {
    const imageUrl = getImagesReading($(element));
    imageUrls.push(imageUrl);
  });
  $(".comment-list .item.clearfix").each(function (index, element) {
    const comment = crawlComments($(element), $);
    comments.push(comment);
  });
  return { imageUrls, detailsChapter, comments };
};

export default catchAsync(crawlChapterComic);
