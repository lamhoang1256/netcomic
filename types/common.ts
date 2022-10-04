import { IComic } from "./home";

export interface IPagination {
  active: boolean;
  title: string;
  display: string;
  href: string;
}
export interface IQueryParams {
  [key: string]: string | string[];
}
export interface IDataGenderComic {
  comics: IComic[];
  pagination: IPagination[];
}
