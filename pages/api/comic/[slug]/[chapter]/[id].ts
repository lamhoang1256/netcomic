import { IComment, IDetailsChapter, IImageReading, ILinkChapter } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catch-async";
import { crawlChapters, crawlComments, getImagesReading } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const ChapterComicApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { slug, chapter, id } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data: any = await getDetailsChapter(`${PATH.netTruyenComic}/${slug}/${chapter}/${id}`);
  const chapters = await getLinkChapters(
    `${PATH.netTruyenComic}/${data?.info.href?.replace("truyen-tranh/", "")}`
  );
  const response = {
    message: "Lấy chi tiết chapter thành công!",
    data: { ...data, ...chapters },
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
  $(".reading .container .top")
    .first()
    .each(function (index, element) {
      const originalUrl = PATH.netTruyen + "/";
      const heading = $(element).find("h1.txt-primary");
      const href = heading.find("a").attr("href")?.replace(originalUrl, "") as string;
      const title = heading.find("a").text();
      const chapter = heading.find("span").text()?.replace("- ", "") as string;
      const updatedAt = $(element).find("i").text();
      info = { title, updatedAt, chapter, href };
    });
  $(".reading-detail .page-chapter").each(function (index, element) {
    const imageUrl = getImagesReading($(element));
    imageUrls.push(imageUrl);
  });
  $(".comment-list .item.clearfix").each(function (index, element) {
    const comment = crawlComments($(element), $);
    comments.push(comment);
  });
  return { imageUrls, info, comments };
};

const getLinkChapters = async (url: string) => {
  let chapters: ILinkChapter[] = [];
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  $("#ctl00_divCenter .list-chapter li.row").each(function (index, element) {
    const chapter = crawlChapters($(element));
    chapters.push(chapter);
  });
  return { chapters };
};

export default catchAsync(ChapterComicApi);
