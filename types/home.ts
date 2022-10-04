import { IPagination } from "./common";

export interface IDataHomePage {
  newestComics: any[];
  pagination: IPagination[];
}

export interface IBanner {
  id: number;
  imageUrl: string;
}

export interface IComic {
  slug: string;
  title: string;
  posterUrl: string;
  newestChapter: string;
  updatedAgo: string;
  newestHref: string;
}
