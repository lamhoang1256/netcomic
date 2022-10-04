import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import { IFilterOptions } from "types/filter";
import { IComic } from "types/home";
import catchAsync from "utils/catch-async";
import { crawlComic } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const filterComics = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlFilterComics(query.params);
  const response = {
    message: "Lấy danh sách truyện thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function crawlFilterComics(params: any) {
  const response = await axios.get(PATH.netTruyenFilter, { params });
  const html = response.data;
  const $ = cheerio.load(html);
  let results: IComic[] = [];
  let options: IFilterOptions = {
    minchapter: [],
    genres: [],
    status: [],
    gender: [],
    sort: [],
  };
  $(".ModuleContent .item", html).each(function (index, element) {
    const comic = crawlComic($(element));
    results.push(comic);
  });
  $(".genre-item", html).each(function (index, element) {
    const value = $(element).find("span").attr("data-id") || "";
    const content = $(element).text().trim();
    const isSelected = false;
    const genre = { value, content, isSelected };
    options.genres.push(genre);
  });
  $(".select-minchapter option", html).each(function (index, element) {
    const minchapter = crawlDataFilterOption($(element));
    options.minchapter.push(minchapter);
  });
  $(".select-status option", html).each(function (index, element) {
    const status = crawlDataFilterOption($(element));
    options.status.push(status);
  });
  $(".select-gender option", html).each(function (index, element) {
    const gender = crawlDataFilterOption($(element));
    options.gender.push(gender);
  });
  $(".select-sort option", html).each(function (index, element) {
    const sort = crawlDataFilterOption($(element));
    options.sort.push(sort);
  });
  return { options, results };
}

function crawlDataFilterOption(node: any) {
  const value = node.attr("value") || "";
  const content = node.text();
  const isSelected = node.attr("selected") === "selected" ? true : false;
  return { value, content, isSelected };
}

export default catchAsync(filterComics);
