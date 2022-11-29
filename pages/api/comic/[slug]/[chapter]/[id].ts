import { ICommentItem, IDetailsChapter, IImageReading, ILinkChapter } from "@types";
import * as cheerio from "cheerio";
import axiosNhattruyen from "configs/axiosNhattruyen";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import { crawlComments, crawlImagesReading, crawlLinkChapter } from "libs/cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { ApiError, responseError, responseSuccess } from "utils/response";

const crawlChapterComic = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { slug, chapter, id } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await getDetailsChapter(`${PATH.nhatTruyenComic}/${slug}/${chapter}/${id}`);
  const response = {
    message: "Lấy chi tiết chapter thành công!",
    data
  };
  responseSuccess(res, response);
};

const getDetailsChapter = async (url: string) => {
  const response = await axiosNhattruyen(url);
  const html = response.data;
  const $ = cheerio.load(html);
  let imageUrls: IImageReading[] = [];
  let info = {} as IDetailsChapter;
  let comments: ICommentItem[] = [];
  let chapters: ILinkChapter[] = [];
  info.posterUrl = $('meta[itemprop="image"]')
    .attr("content")
    ?.replace("http://", "https://") as string;
  const infoElement = $(".reading .container .top");
  const originalUrl = PATH.nhatTruyen + "/";
  const heading = $(infoElement).find("h1.txt-primary");
  info.href = heading.find("a").attr("href")?.replace(originalUrl, "") as string;
  info.title = heading.find("a").text();
  info.chapter = heading.find("span").text()?.replace("- ", "") as string;
  info.updatedAt = $(infoElement).find("i").text();
  $(".reading-detail .page-chapter").each(function (index, element) {
    const imageUrl = crawlImagesReading($(element));
    imageUrls.push(imageUrl);
  });
  $(".comment-list .item.clearfix").each(function (index, element) {
    const comment = crawlComments($(element), $);
    comments.push(comment);
  });
  const response2 = await axiosNhattruyen(
    `${PATH.nhatTruyenComic}/${info.href?.replace("truyen-tranh/", "")}`
  );
  const html2 = response2.data;
  const $2 = cheerio.load(html2);
  $2("#ctl00_divCenter .list-chapter li.row").each(function (index, element) {
    const chapter = crawlLinkChapter($2(element));
    chapters.push(chapter);
  });
  imageUrls.shift();
  return {
    imageUrls,
    info,
    chapters,
    comments
  };
};

export default catchAsync(crawlChapterComic);

/** Lấy thông tin chapter
 * @swagger
 * /comic/{slug}/{chapter}/{id}:
 *  get:
 *      summary: Lấy thông tin chapter
 *      tags: [Comic]
 *      parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         example: dai-quan-gia-la-ma-hoang
 *         schema:
 *           type: string
 *       - in: path
 *         name: chapter
 *         required: true
 *         example: chap-332
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         example: 921580
 *         schema:
 *           type: string
 *      responses:
 *          200:
 *              description: Success
 */
