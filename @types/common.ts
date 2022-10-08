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
export interface IComment {
  id: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
  replyComments: IReplyComment[];
}
