export interface ILinkChapter {
  id: string;
  href: string;
  title: string;
  updatedAt: string;
  viewCount: string;
}
export interface IComicChapters {
  href: string;
  name: string;
  updatedAgo: string;
}
export interface IComic {
  slug: string;
  title: string;
  posterUrl: string;
  newestChapter: string;
  updatedAgo: string;
  newestHref: string;
  viewCount: string;
  commentCount: string;
  followCount: string;
  chapters: IComicChapters[];
}
export interface IComicInfo {
  title: string;
  slug: string;
  updatedAt: string;
  posterUrl: string;
  author: string;
  status: string;
  categories: { display: string; href: string }[];
  viewCount: string;
  ratingCount: string;
  ratingValue: string;
  followCount: string;
  description: string;
}
export interface IComicFollow {
  title: string;
  posterUrl: string;
  slug: string;
  idNewChapter: string;
  hrefNewChapter: string;
  newChapter: string;
  updatedAt: string;
}
export interface IComicChartRanking {
  rank: string;
  title: string;
  posterUrl: string;
  href: string;
  view: string;
  newestChapter: string;
  newestHref: string;
}
export interface IComicHistory {
  id: string;
  slug: string;
  title: string;
  chapterName: string;
  posterUrl: string;
  chapterUrl: string;
  chapters: string[];
}
