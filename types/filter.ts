export interface IFilterItem {
  value: string;
  content: string;
}

export interface IFilterOptions {
  genres: IFilterItem[];
  minchapter: IFilterItem[];
  status: IFilterItem[];
  gender: IFilterItem[];
  sort: IFilterItem[];
}

export interface IParamsFilter {
  genres: string;
  notgenres: string;
  gender: string;
  status: string;
  minchapter: string;
  sort: string;
}
