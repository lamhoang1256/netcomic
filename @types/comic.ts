export interface ILinkChapter {
  id: string;
  href: string;
  title: string;
  updatedAt: string;
  viewCount: string;
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
  chapters: {
    href: string;
    name: string;
    updatedAgo: string;
  }[];
}
export interface IComicInfo {
  title: string;
  slug: string;
  updatedAt: string;
  posterUrl: string;
  author: string;
  status: string;
  categories: string;
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
