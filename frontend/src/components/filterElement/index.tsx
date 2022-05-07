import './styles.scss';
import { Button } from 'react-bootstrap';
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
      <h6>{filterTitle}</h6>
      <div className="grid">
        {filterList.map((filter) => {
          return (
            <Button
              key={filter.filterValue}
              onClick={() => handleFiltersButton(filter.filterValue!)}
              className={filter.state ? 'selected' : ''}
            >
              <span>{filter.filterValue}</span>

              <span>+</span>
            </Button>
          );
        })}
      </div>
    </>
  );
}
