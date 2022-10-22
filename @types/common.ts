import { IComic } from "./comic";

export interface IQueryParams {
  [key: string]: string | string[];
}
export interface IPagination {
  active: boolean;
  title: string;
  display: string;
  href: string;
}
export interface ICategory {
  href: string;
  display: string;
}
export interface ICategoryInfo {
  name: string;
  description: string;
}
export interface IComicGender {
  comics: IComic[];
  pagination: IPagination[];
}
export interface IImageReading {
  alt: string;
  imageUrl: string;
}
export interface IDetailsChapter {
  title: string;
  posterUrl: string;
  chapter: string;
  updatedAt: string;
  href: string;
  nextChapter: string;
  prevChapter: string;
}
export interface IReplyComment {
  id: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
  mentionUser: string;
}
export interface ICommentItem {
  id: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
  replyComments: IReplyComment[];
}
export interface IComment {
  id: string;
  fullname: string;
  avatar: string;
  content: string;
  like: number;
  unlike: number;
  createdAt: string;
  level: number;
  status: string;
}
