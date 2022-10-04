import { IComment } from "./read";

export interface IComicInfo {
  title: string;
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
export interface IOptionChapter {
  id: string;
  href: string;
  title: string;
  updatedAt: string;
  viewCount: string;
}

export interface IComicDetails {
  info: IComicInfo;
  chapters: IOptionChapter[];
  comments: IComment[];
}
