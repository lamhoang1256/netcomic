import axios from "axios";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import { IQueryParams } from "types/common";
import { IComic, IDataHomePage } from "types/home";
import catchAsync from "utils/catch-async";
import { crawlComic, getFeaturedComic, getPagination } from "utils/crawl";
import { ApiError, responseError, responseSuccess } from "utils/response";

const crawlHomePage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  const banners = await crawlBanners();
  const comics = await crawlHomeComics(query);
  const response = {
    message: "Lấy dữ liệu trang home thành công!",
    data: { banners, ...comics },
  };
  responseSuccess(res, response);
};

async function crawlHomeComics(query: Partial<IQueryParams>) {
  const response = await axios.get(PATH.netTruyen as string, { params: query });
  const html = response.data;
  const $ = cheerio.load(html);
  let dataHomePage: IDataHomePage = { featuredComics: [], newestComics: [], pagination: [] };
  $(".top-comics .item", html).each(function (index, element) {
    const comic = getFeaturedComic($(element));
    dataHomePage.featuredComics.push(comic);
  });
  $("#ctl00_divCenter .ModuleContent .item", html).each(function (index, element) {
    const comic = crawlComic($(element));
    let chapters: any[] = [];
    $(element)
      .find(".chapter")
      .each(function (index, element) {
        const name = $(element).find("a").text();
        const updatedAgo = $(element).find(".time").text();
        chapters.push({ name, updatedAgo });
      });
    dataHomePage.newestComics.push({ ...comic, chapters });
  });
  $("#ctl00_divCenter .pagination li", html).each(function (index, element) {
    const paginationItem = getPagination($(element));
    dataHomePage.pagination.push(paginationItem);
  });
  return dataHomePage;
}

async function crawlBanners() {
  const response = await axios.get(PATH.netTruyen as string);
  const html = response.data;
  const $ = cheerio.load(html);
  let banners: IComic[] = [];
  $(".items-slide .item", html).each(function (index, element) {
    const slug =
      $(element).find(".slide-caption > h3 > a").attr("href")?.split("/truyen-tranh/")?.[1] || "";
    const title = $(element).find(".slide-caption > h3").text();
    const posterUrl = $(element).find(".lazyOwl").attr("data-src") || "";
    const updatedAgo = $(element).find(".slide-caption .time").first().text();
    const newestEle = $(element).find(".slide-caption > a").first();
    const newestChapter = newestEle.text();
    const newestHref = newestEle.attr("href")?.split("/truyen-tranh/")?.[1] || "";
    const banner = { slug, title, posterUrl, newestChapter, updatedAgo, newestHref };
    banners.push(banner);
  });
  return banners;
}

export default catchAsync(crawlHomePage);
