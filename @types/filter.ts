export interface IFilter {
  value: string;
  label: string;
}
export interface IFilters {
  genres: IFilter[];
  minchapter: IFilter[];
  status: IFilter[];
  gender: IFilter[];
  sort: IFilter[];
}
export interface IFilterParams {
  genres: string;
  notgenres: string;
  gender: string;
  status: string;
  minchapter: string;
  sort: string;
}
