export interface IOrderedField {
  order: number;
  value: string;
  name: string;
  image?: string;
  price?: number;
  media?: { url: string }[];
}

export interface IDataSource {
  key: number;
  value: string;
  name?: string;
  label?: string;
  children: any[];
  selectable?: boolean;
  disableCheckbox?: boolean;
}

export interface IPagination {
  current: number;
  pageSize: number;
  total: number;
}
