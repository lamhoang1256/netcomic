import * as cheerio from "cheerio";
import { IDataGenderComic } from "types/common";

const URL_NETTRUYEN = process.env.URL_NETTRUYEN || "";
const urlNetTruyenWithoutHttp = URL_NETTRUYEN?.split("http:")[1] || "";

export function getFeaturedComic(node: any) {
  const slug = node.find("a").attr("href")?.split("/truyen-tranh/")?.[1] || "";
  const title = node.find(".slide-caption h3 a").text();
  const posterUrl = node.find(".lazyOwl").attr("data-src") || "";
  const newestChapter = node.find(".slide-caption > a").text();
  const updatedAgo = node.find(".slide-caption > .time").text().trim();
  const newestHref =
    node.find(".slide-caption > a").attr("href")?.split("/truyen-tranh/")?.[1] || "";
  return { slug, title, posterUrl, newestChapter, updatedAgo, newestHref };
}

export function crawlComic(node: any) {
  const slug = node.find(".image > a").attr("href")?.split("/truyen-tranh/")?.[1] || "";
  const title = node.find(".jtip").text();
  const posterUrl = node.find(".image > a > img").attr("data-original") || "";
  const updatedAgo = node.find(".comic-item .chapter .time").first().text();
  const newestEle = node.find(".comic-item .chapter a").first();
  const newestChapter = newestEle.text();
  const newestHref = newestEle.attr("href")?.split("/truyen-tranh/")?.[1] || "";
  return { slug, title, posterUrl, newestChapter, updatedAgo, newestHref };
}

export function getCommentItem(node: any) {
  const id = node.attr("id")?.replace("comment_", "");
  const username = node.find(".authorname").first().text();
  const avatar = node
    .find("img")
    .first()
    .attr("data-original")
    ?.replace(urlNetTruyenWithoutHttp, URL_NETTRUYEN);
  const content = node.find(".comment-content").first().text();
  const createdAt = node.find("abbr").first().text().trim();
  return { id, username, avatar, content, createdAt };
}

export function getCommentReplyItem(node: any) {
  const id = node.attr("id")?.replace("comment_", "");
  const username = node.find(".authorname").text();
  const avatar = node
    .find("img")
    .attr("data-original")
    ?.replace(urlNetTruyenWithoutHttp, URL_NETTRUYEN);
  const mentionUser = node.find(".comment-content .mention-user").text().trim();
  const content = node.find(".comment-content").text().trim().replace(mentionUser, "");
  const createdAt = node.find("abbr").text().trim();
  return { id, username, avatar, content, createdAt, mentionUser };
}

export function getEpisodeList(node: any) {
  const id = node.find(".chapter a").attr("data-id");
  const href = node.find(".chapter a").attr("href").split("/truyen-tranh/")[1] || "";
  const title = node.find(".chapter a").text();
  const updatedAt = node.find(".col-xs-4").text();
  const viewCount = node.find(".col-xs-3").text();
  return { id, href, title, updatedAt, viewCount };
}

export function getImagesReading(node: any) {
  const imageUrl = node.find("img").attr("data-original");
  const alt = node.find("img").attr("alt");
  return { alt, imageUrl };
}

export function getPagination(node: any, replaceHref = `${URL_NETTRUYEN}/`) {
  const display = node.text();
  const active = node.hasClass("active");
  const title = node.find("a").attr("title") || "";
  const href = node.find("a").attr("href")?.replace(replaceHref, "") || "";
  return { active, title, display, href };
}

export function crawlInfoComic(node: any) {
  const title = node.find(".title-detail").text();
  const updatedAt = node.find("time.small").text().trim();
  const posterUrl = node
    .find(".col-image img")
    .attr("src")
    ?.replace(urlNetTruyenWithoutHttp, URL_NETTRUYEN);
  const author = node.find(".author .col-xs-8").text();
  const status = node.find(".status .col-xs-8").text();
  const categories = node.find(".kind .col-xs-8").text();
  const viewCount = node.find(".list-info .col-xs-8").last().text();
  const ratingValue = node.find(".mrt5.mrb10 > span > span").first().text();
  const ratingCount = node.find(".mrt5.mrb10 > span > span").last().text();
  const followCount = node.find(".follow span b").text();
  const description = node.find(".detail-content p").text().trim();
  return {
    title,
    updatedAt,
    posterUrl,
    author,
    status,
    categories,
    viewCount,
    ratingCount,
    ratingValue,
    followCount,
    description,
  };
}

export const crawlGenderComics = (html: any) => {
  const $ = cheerio.load(html);
  let data: IDataGenderComic = { comics: [], pagination: [] };
  $("#ctl00_divCenter .ModuleContent .item", html).each(function (index, element) {
    const comic = crawlComic($(element));
    data.comics.push(comic);
  });
  $("#ctl00_divCenter .pagination li", html).each(function (index, element) {
    const paginationItem = getPagination($(element), `${URL}`);
    data.pagination.push(paginationItem);
  });
  return data;
};
