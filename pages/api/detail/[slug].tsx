import axios from "axios";
import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import { ICommentReply } from "types/read";
import { IComicInfo, IComicDetails } from "types/detail";
import { crawlInfoComic, getCommentItem, getCommentReplyItem, getEpisodeList } from "utils/crawl";
import catchAsync from "utils/catch-async";
import { ApiError, responseError, responseSuccess } from "utils/response";
import { STATUS } from "constants/status";
import { PATH } from "constants/path";

const getDetailsComic = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { slug } = query;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlDetailsComic(`${PATH.netTruyenComic}/${slug}`);
  const response = {
    message: "Lấy chi tiết truyện thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function crawlDetailsComic(url: string) {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  let dataDetails: IComicDetails = {
    info: {} as IComicInfo,
    chapters: [],
    comments: [],
  };
  $("#ctl00_divCenter").each(function (index, element) {
    dataDetails.info = crawlInfoComic($(element));
  });
  $("#ctl00_divCenter .list-chapter li.row").each(function (index, option) {
    const chapter = getEpisodeList($(option));
    dataDetails.chapters.push(chapter);
  });
  $("#ctl00_divCenter .comment-list .item.clearfix").each(function (index, element) {
    let replyComments: ICommentReply[] = [];
    const comment = getCommentItem($(element).first());
    $(element)
      .find(".item.child")
      .each(function (index, element) {
        const replyComment = getCommentReplyItem($(element));
        replyComments.push(replyComment);
      });
    dataDetails.comments.push({ ...comment, replyComments });
  });
  return dataDetails;
}

export default catchAsync(getDetailsComic);
