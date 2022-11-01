import { ILinkChapter, IComicInfo, ICommentItem } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { crawlLinkChapter, crawlComments, crawlInfoComic } from "libs/cheerio";
import { ApiError, responseError, responseSuccess } from "utils/response";

const ComicDetailsApi = async (req: NextApiRequest, res: NextApiResponse) => {
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

async function crawlComicDetails(url: string) {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  let info: IComicInfo = {} as IComicInfo;
  let chapters: ILinkChapter[] = [];
  let comments: ICommentItem[] = [];
  $("#ctl00_divCenter").each(function (index, element) {
    info = crawlInfoComic($(element), `${PATH.nhatTruyenComic}/`, $);
  });
  $("#ctl00_divCenter .list-chapter li.row").each(function (index, element) {
    const chapter = crawlLinkChapter($(element));
    chapters.push(chapter);
  });
  $("#ctl00_divCenter .comment-list .item.clearfix").each(function (index, element) {
    const comment = crawlComments($(element), $);
    comments.push(comment);
  });
  return { info, chapters, comments };
}

export default catchAsync(ComicDetailsApi);

/** Lấy chi tiết truyện
 * @swagger
 * /comic/{slug}:
 *  get:
 *      summary: Lấy chi tiết truyện
 *      tags: [Comic]
 *      parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         example: dai-quan-gia-la-ma-hoang
 *         schema:
 *           type: string
 *           description: slug
 *      responses:
 *          200:
 *              description: Success
 */
