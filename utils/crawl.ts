import {
  IBanner,
  ILinkChapter,
  IComic,
  IComicInfo,
  IComicChartRanking,
  IComment,
  IComicGender,
  IImageReading,
  IPagination,
  IReplyComment,
} from "@types";
import * as cheerio from "cheerio";
import { PATH } from "constants/path";

const urlWithoutHttp = PATH.netTruyen?.split("http:")[1] as string;

export function crawlBanner(node: cheerio.Cheerio<cheerio.Element>): IBanner {
  const slug = node
    .find(".slide-caption > h3 > a")
    .attr("href")
    ?.split("/truyen-tranh/")?.[1] as string;
  const title = node.find(".slide-caption > h3").text();
  const posterUrl = node.find(".lazyOwl").attr("data-src") as string;
  const updatedAgo = node.find(".slide-caption .time").first().text();
  const newestEle = node.find(".slide-caption > a").first();
  const newestChapter = newestEle.text();
  const newestHref = newestEle.attr("href")?.split("/truyen-tranh/")?.[1] as string;
  return { slug, title, posterUrl, newestChapter, updatedAgo, newestHref };
}

export function crawlComic(node: cheerio.Cheerio<cheerio.Element>, $: cheerio.CheerioAPI): IComic {
  const slug = node.find(".image > a").attr("href")?.split("/truyen-tranh/")?.[1] as string;
  const title = node.find(".jtip").text();
  const posterUrl = node.find(".image > a > img").attr("data-original") as string;
  const updatedAgo = node.find(".comic-item .chapter .time").first().text();
  const newestEle = node.find(".comic-item .chapter a").first();
  const newestChapter = newestEle.text();
  const count = node.find(".pull-left").text().trim();
  const viewCount = count.split("  ")[0];
  const commentCount = count.split("  ")[1];
  const followCount = count.split("  ")[2];
  const newestHref = newestEle.attr("href")?.split("/truyen-tranh/")?.[1] as string;
  let chapters: {
    name: string;
    updatedAgo: string;
    href: string;
  }[] = [];
  node.find(".chapter").each(function (index, element) {
    const name = $(element).find("a").text();
    const href = $(element).find("a").attr("href")?.replace(PATH.netTruyenComic, "") as string;
    const updatedAgo = $(element).find(".time").text();
    chapters.push({ name, href, updatedAgo });
  });
  return {
    slug,
    title,
    posterUrl,
    newestChapter,
    updatedAgo,
    newestHref,
    viewCount,
    commentCount,
    followCount,
    chapters,
  };
}

export function crawlReplyComment(
  node: cheerio.Cheerio<cheerio.Element>,
  $: cheerio.CheerioAPI
): IReplyComment[] {
  let replyComments: IReplyComment[] = [];
  $(node)
    .find(".item.child")
    .each(function (index, element) {
      const id = $(element).attr("id")?.replace("comment_", "") as string;
      const username = $(element).find(".authorname").text();
      const avatar = $(element)
        .find("img")
        .attr("data-original")
        ?.replace(urlWithoutHttp, PATH.netTruyen as string) as string;
      const mentionUser = $(element).find(".comment-content .mention-user").text().trim();
      const content = $(element).find(".comment-content").text().trim().replace(mentionUser, "");
      const createdAt = $(element).find("abbr").text().trim();
      replyComments.push({ id, username, avatar, content, createdAt, mentionUser });
    });
  return replyComments;
}

export function crawlComments(
  node: cheerio.Cheerio<cheerio.Element>,
  $: cheerio.CheerioAPI
): IComment {
  const id = node.attr("id")?.replace("comment_", "") as string;
  const username = node.find(".authorname").first().text();
  const avatar = node
    .find("img")
    .first()
    .attr("data-original")
    ?.replace(urlWithoutHttp, PATH.netTruyen as string) as string;
  const content = node.find(".comment-content").first().text();
  const createdAt = node.find("abbr").first().text().trim();
  const replyComments: IReplyComment[] = crawlReplyComment($(node), $);
  return { id, username, avatar, content, createdAt, replyComments };
}

export function crawlChapters(node: cheerio.Cheerio<cheerio.Element>): ILinkChapter {
  const id = node.find(".chapter a").attr("data-id") as string;
  const href = node.find(".chapter a").attr("href")?.split("/truyen-tranh/")[1] as string;
  const title = node.find(".chapter a").text();
  const updatedAt = node.find(".col-xs-4").text();
  const viewCount = node.find(".col-xs-3").text();
  return { id, href, title, updatedAt, viewCount };
}

export function crawlPagination(
  node: cheerio.Cheerio<cheerio.Element>,
  replaceHref = PATH.netTruyen as string
): IPagination {
  const display = node.text();
  const active = node.hasClass("active");
  const title = node.find("a").attr("title") as string;
  const href = node.find("a").attr("href")?.replace(replaceHref, "") as string;
  return { active, title, display, href };
}

export function crawlComicTopMonth(
  node: cheerio.Cheerio<cheerio.Element>,
  replaceHref = PATH.netTruyenComic as string
): IComicChartRanking {
  const rank = node.find(".txt-rank").text();
  const title = node.find(".title a").text();
  const posterUrl = node
    .find(".thumb img")
    .attr("data-original")
    ?.replace(replaceHref, "") as string;
  const href = node.find(".thumb").attr("href")?.replace(replaceHref, "") as string;
  const newestChapter = node.find(".chapter a").text();
  const newestHref = node.find(".chapter a").attr("href")?.replace(replaceHref, "") as string;
  const view = node.find(".view").text().trim();
  return { rank, title, posterUrl, href, newestChapter, view, newestHref };
}

export function crawlInfoComic(
  node: cheerio.Cheerio<cheerio.Element>,
  replaceHref = `${PATH.netTruyen as string}/`
): IComicInfo {
  const title = node.find(".title-detail").text();
  const updatedAt = node.find("time.small").text().trim();
  const posterUrl = node
    .find(".col-image img")
    .attr("src")
    ?.replace(urlWithoutHttp, PATH.netTruyen as string) as string;
  const slug = node.find(".col-info .mrb10 a").attr("href")?.replace(replaceHref, "") as string;
  const author = node.find(".author .col-xs-8").text();
  const status = node.find(".status .col-xs-8").text();
  const categories = node.find(".kind .col-xs-8").text();
  const viewCount = node.find(".list-info .col-xs-8").last().text();
  const ratingValue = node.find(".mrt5.mrb10 > span > span").first().text();
  const ratingCount = node.find(".mrt5.mrb10 > span > span").last().text();
  const followCount = node.find(".follow span b").text();
  const description = node.find(".detail-content p").text().trim();
  return {
    slug,
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

export function getImagesReading(node: cheerio.Cheerio<cheerio.Element>): IImageReading {
  const imageUrl = node.find("img").attr("data-original") as string;
  const alt = node.find("img").attr("alt") as string;
  return { alt, imageUrl };
}
/// not optimized

export const crawlGenderComics = (html: any) => {
  const $ = cheerio.load(html);
  let data: IComicGender = { comics: [], pagination: [] };
  $("#ctl00_divCenter .ModuleContent .item", html).each(function (index, element) {
    const comic = crawlComic($(element), $);
    data.comics.push(comic);
  });
  $("#ctl00_divCenter .pagination li", html).each(function (index, element) {
    const paginationItem = crawlPagination($(element), `${URL}`);
    data.pagination.push(paginationItem);
  });
  return data;
};
