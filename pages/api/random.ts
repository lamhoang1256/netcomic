import { IQueryParams } from "@types";
import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { crawlComic } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const RandomApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await randomComic(query);
  const response = {
    message: "Random truyện thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function randomComic(query: Partial<IQueryParams>) {
  const PER_COMIC_AT_NHATTRUYEN = 36;
  const limit = Number(query?.limit) || 24;
  const pageCount = 50;
  const comics = await Promise.all(
    Array(limit)
      .fill(0)
      .map(async () => {
        const randomPage = Math.floor(Math.random() * pageCount);
        const response = await axios.get(PATH.netTruyen as string, {
          params: { page: randomPage },
        });
        const html = response.data;
        const $ = cheerio.load(html);
        const randomElement = Math.floor(Math.random() * (PER_COMIC_AT_NHATTRUYEN + 1));
        const randomComic = $("#ctl00_divCenter .ModuleContent .item", html)[randomElement];
        const comic = crawlComic($(randomComic), $);
        return comic;
      })
  );
  return comics.filter((comic) => comic.slug);
}

export default catchAsync(RandomApi);
