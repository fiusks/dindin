import { Dispatch } from 'react';
import { ITransaction } from './transactions';

export interface IFiltersTransactions {
  filterValue?: string;
  state?: boolean;
}
export interface IFilterOptions {
  weekday: IFiltersTransactions[];
  categories: IFiltersTransactions[];
  minValue: string;
  maxValue: string;
}

export type FilterContextType = {
  filters: IFilterOptions;
  setActiveFilters: Dispatch;
  activeFilters: IFilterOptions;
  updateCategoryList: (transactions: ITransaction[]) => void;
  updateFilterStatus: (
    newFilters: IFiltersTransactions[],
    filterType: 'weekday' | 'categories',
    selectedFilter: string
  ) => void;
};
