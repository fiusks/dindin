import './style.scss';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

interface Filter {
  filterName: string;
  value: number | boolean;
}

interface Props {
  filterTitle: string;
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

export default function FilterElement({ filterTitle, setFilters }: Props) {
  const [filterByDay, setFilterByDay] = useState([
    { filterName: 'Segunda', value: false },
    { filterName: 'Terça', value: false },
    { filterName: 'Quarta', value: false },
    { filterName: 'Quinta', value: false },
    { filterName: 'Sexta', value: false },
    { filterName: 'Sábado', value: false },
    { filterName: 'Domingo', value: false },
  ]);

  const handleFiltersButton = function (clickedFilter: string) {
    const selectedFilterIndex = filterByDay.findIndex(
      (filter) => filter.filterName === clickedFilter
    );
    const newFilterByDay = [...filterByDay];
    if (selectedFilterIndex !== -1) {
      newFilterByDay[selectedFilterIndex].value =
        !newFilterByDay[selectedFilterIndex].value;
    }
    setFilterByDay(newFilterByDay);
  };
  useEffect(() => {
    const selectedFilters = [...filterByDay];
    const filterList = selectedFilters.filter((filter) => filter.value);
    setFilters(filterList);
  }, [filterByDay]);

  return (
    <>
      <h6>{filterTitle}</h6>
      <div className="grid">
        {filterByDay.map((filter) => {
          return (
            <Button
              key={filter.filterName}
              onClick={() => handleFiltersButton(filter.filterName)}
              className={filter.value ? 'selected' : ''}
            >
              <span>{filter.filterName}</span>

              <span>+</span>
            </Button>
          );
        })}
      </div>
    </>
  );
}
