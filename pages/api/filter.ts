import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import { IFilters, IComic, IQueryParams, IPagination } from "@types";
import catchAsync from "utils/catchAsync";
import { crawlComic, crawlPagination } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const filterComicsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const data = await crawlFilterComics(query);
  const response = {
    message: "Lấy danh sách truyện thành công!",
    data,
  };
  responseSuccess(res, response);
};

async function crawlFilterComics(query: Partial<IQueryParams>) {
  const response = await axios.get(PATH.nhatTruyenFilter, { params: query });
  const html = response.data;
  const $ = cheerio.load(html);
  let results: IComic[] = [];
  let paginations: IPagination[] = [];
  let filters: IFilters = {
    minchapter: [],
    genres: [],
    status: [],
    gender: [],
    sort: [],
  };
  $(".ModuleContent .item", html).each(function (index, element) {
    const comic = crawlComic($(element), $);
    results.push(comic);
  });
  $(".genre-item", html).each(function (index, element) {
    const value = $(element).find("span").attr("data-id") || "";
    const label = $(element).text().trim();
    const isSelected = false;
    const genre = { value, label, isSelected };
    filters.genres.push(genre);
  });
  $(".select-minchapter option", html).each(function (index, element) {
    const minchapter = crawlFilterOption($(element));
    filters.minchapter.push(minchapter);
  });
  $(".select-status option", html).each(function (index, element) {
    const status = crawlFilterOption($(element));
    filters.status.push(status);
  });
  $(".select-gender option", html).each(function (index, element) {
    const gender = crawlFilterOption($(element));
    filters.gender.push(gender);
  });
  $(".select-sort option", html).each(function (index, element) {
    const sort = crawlFilterOption($(element));
    filters.sort.push(sort);
  });
  $("#ctl00_divCenter .pagination li", html).each(function (index, element) {
    const pagination = crawlPagination($(element), PATH.nhatTruyenFilter);
    paginations.push(pagination);
  });
  return { filters, results, paginations };
}

function crawlFilterOption(node: cheerio.Cheerio<cheerio.Element>) {
  const value = node.attr("value") || "";
  const label = node.text();
  const isSelected = node.attr("selected") === "selected" ? true : false;
  return { value, label, isSelected };
}

export default catchAsync(filterComicsApi);
