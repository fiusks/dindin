import {
  IFilterOptions,
  FilterContextType,
  IFiltersTransactions,
} from '../@types/filters';
import { createContext, useState, FC, ReactNode } from 'react';
import { ITransaction } from '../@types/transactions';
import { firstLetterUppercase } from '../utils/stringFormat';

type Props = {
  children?: ReactNode;
};

export const FilterContext = createContext<FilterContextType | null>(null);

function filterUniqueCategory(transactions: ITransaction[]) {
  const filteredCategory = transactions
    .map((category) => {
      return category.category.toLowerCase();
    })
    .filter((value, index, arr) => arr.indexOf(value.toLowerCase()) === index)
    .map((category) => {
      return {
        filterValue: firstLetterUppercase(category),
        state: false,
      };
    });
  return filteredCategory;
}

const FilterProvider: FC<Props> = ({ children }) => {
  const [filters, setFilters] = useState<IFilterOptions>({
    weekday: [
      { filterValue: 'Segunda', state: false },
      { filterValue: 'Terça', state: false },
      { filterValue: 'Quarta', state: false },
      { filterValue: 'Quinta', state: false },
      { filterValue: 'Sexta', state: false },
      { filterValue: 'Sábado', state: false },
      { filterValue: 'Domingo', state: false },
    ],
    categories: [],
    minValue: '',
    maxValue: '',
  });
  const [activeFilters, setActiveFilters] = useState<IFilterOptions>({
    weekday: [],
    categories: [],
    minValue: '',
    maxValue: '',
  });

  const updateCategoryList = (transactions: ITransaction[]) => {
    setFilters({ ...filters, categories: filterUniqueCategory(transactions) });
  };

  const updateFilterStatus = (
    filterList: IFiltersTransactions[],
    filterType: 'weekday' | 'categories',
    selectedFilter: string
  ) => {
    const changedFilterList = filterList.map((filter) =>
      filter.filterValue === selectedFilter
        ? { ...filter, state: !filter.state }
        : filter
    );

    const newFilterList = { ...filters, [filterType]: changedFilterList };
    setFilters(newFilterList);

    function selectActiveFilters(list: IFiltersTransactions[]) {
      const newList = list.filter((listItem) => listItem.state);
      return newList;
    }

    const selectedWeekday = selectActiveFilters(newFilterList.weekday);
    const selectedCategories = selectActiveFilters(newFilterList.categories);
    const selectedMin = filters.minValue;
    const selectedMax = filters.maxValue;
    const selectedFilters: IFilterOptions = {
      weekday: selectedWeekday,
      categories: selectedCategories,
      minValue: selectedMin,
      maxValue: selectedMax,
    };

    setActiveFilters(selectedFilters);
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setActiveFilters,
        activeFilters,
        updateCategoryList,
        updateFilterStatus,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
