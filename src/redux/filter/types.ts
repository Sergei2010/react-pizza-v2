export enum SortPropertyEnum {
  RAITING_DECK = 'raiting',
  RAITING_ASC = '-raiting',
  TITLE_DECK = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};
export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}
