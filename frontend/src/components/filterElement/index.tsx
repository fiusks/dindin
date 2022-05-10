import './styles.scss';

import { useContext } from 'react';
import { FilterContextType, IFiltersTransactions } from '../../@types/filters';
import { FilterContext } from '../../contexts/filterContext';

interface Props {
  filterTitle: string;
  filterList: IFiltersTransactions[];
}

export default function FilterElement({ filterTitle, filterList }: Props) {
  const { updateFilterStatus } = useContext(FilterContext) as FilterContextType;
  const filterType = filterTitle === 'Categoria' ? 'categories' : 'weekday';
  const handleFiltersButton = function (selectedFilter: string) {
    updateFilterStatus(filterList, filterType, selectedFilter);
  };

  return (
    <>
      <h6 className="filter-title">{filterTitle}</h6>
      <div className="grid">
        {filterList.map((filter) => {
          return (
            <button
              key={filter.filterValue}
              onClick={() => handleFiltersButton(filter.filterValue!)}
              className={filter.state ? 'selected' : ''}
            >
              <div className="filter-text">
                {filter.filterValue}
                <span>+</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
