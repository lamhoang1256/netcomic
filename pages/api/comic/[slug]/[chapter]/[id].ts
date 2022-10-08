import { IComment, IDetailsChapter, IImageReading, ILinkChapter } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { crawlChapters, crawlComments, crawlImagesReading } from "utils/crawl";
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
  let info = {} as IDetailsChapter;
  let comments: IComment[] = [];
  let chapters: ILinkChapter[] = [];
  $(".reading .container .top")
    .first()
    .each(function (index, element) {
      const originalUrl = PATH.netTruyen + "/";
      const heading = $(element).find("h1.txt-primary");
      info.href = heading.find("a").attr("href")?.replace(originalUrl, "") as string;
      info.title = heading.find("a").text();
      info.chapter = heading.find("span").text()?.replace("- ", "") as string;
      info.updatedAt = $(element).find("i").text();
    });
  // $(".reading-control").each(function (index, element) {
  //   const prevChapter = $(element)
  //     .find(".a_prev")
  //     .attr("href")
  //     ?.replace(PATH.netTruyenComic, "") as string;
  //   const nextChapter = $(element)
  //     .find(".a_next")
  //     .attr("href")
  //     ?.replace(PATH.netTruyenComic, "") as string;
  //   info.prevChapter = prevChapter;
  //   info.nextChapter = nextChapter;
  // });
  $(".reading-detail .page-chapter").each(function (index, element) {
    const imageUrl = crawlImagesReading($(element));
    imageUrls.push(imageUrl);
  });
  $(".comment-list .item.clearfix").each(function (index, element) {
    const comment = crawlComments($(element), $);
    comments.push(comment);
  });
  const response2 = await axios.get(
    `${PATH.netTruyenComic}/${info.href?.replace("truyen-tranh/", "")}`
  );
  const html2 = response2.data;
  const $2 = cheerio.load(html2);
  $2("#ctl00_divCenter .list-chapter li.row").each(function (index, element) {
    const chapter = crawlChapters($2(element));
    chapters.push(chapter);
  });
  imageUrls.shift();
  return {
    imageUrls,
    info,
    chapters,
    comments,
  };
};

export default catchAsync(crawlChapterComic);
