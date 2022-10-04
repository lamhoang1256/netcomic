import { IComic } from "./home";

export interface ITopComicItem {
  active: string;
  title: string;
  href: string;
}
export interface IDataTopComics {
  status: {
    active: boolean;
    title: string;
    href: string;
  }[];
  sort: {
    active: boolean;
    title: string;
    href: string;
  }[];
  results: IComic[];
}
