import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import { ICommentReply, IDetailsChapter, IDataChapter } from "types/read";
import catchAsync from "utils/catch-async";
import { getCommentItem, getCommentReplyItem, getImagesReading } from "utils/crawl";
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
  let dataChapter: IDataChapter = {
    imageUrls: [],
    detailsChapter: {} as IDetailsChapter,
    comments: [],
  };
  $(".reading .container .top")
    .first()
    .each(function (index, item) {
      const urlOriginal = PATH.netTruyen + "/";
      const blockH1 = $(item).find("h1.txt-primary");
      const urlComic = blockH1.find("a").attr("href")?.replace(urlOriginal, "") || "";
      const title = blockH1.find("a").text();
      const chapter = blockH1.find("span").text();
      const updatedAt = $(item).find("i").text();
      dataChapter.detailsChapter = { title, updatedAt, chapter, urlComic };
    });
  $(".reading-detail .page-chapter").each(function (index, element) {
    const imageUrl = getImagesReading($(element));
    dataChapter.imageUrls.push(imageUrl);
  });
  $(".comment-list .item.clearfix").each(function (index, element) {
    let replyComments: ICommentReply[] = [];
    const comment = getCommentItem($(element).first());
    $(element)
      .find(".item.child")
      .each(function (index, element) {
        const replyComment = getCommentReplyItem($(element));
        replyComments.push(replyComment);
      });
    dataChapter.comments.push({ ...comment, replyComments });
  });
  return dataChapter;
};

export default catchAsync(crawlChapterComic);
