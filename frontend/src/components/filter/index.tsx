import './style.scss';
import { Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import filterIcon from '../../assets/images/filter-icon.svg';
import FilterElement from '../filter-category';

interface Filter {
  filterName: string;
  value: number | boolean;
}
export default function Filter() {
  const [showFilter, setShowFilter] = useState(false);

  const filterByValue = [
    { filterName: 'minValue', value: 0 },
    { filterName: 'maxValue', value: 0 },
  ];

  const filterList: Filter[] = [];

  const [filters, setFilters] = useState(filterList);
  console.log(filters);
  return (
    <Row>
      <Col>
        <Button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <img src={filterIcon} alt="filter icon" className="img-fluid" />
          Filtrar
        </Button>
        {showFilter && (
          <Row className="filter-container">
            <Col>
              <FilterElement
                filterTitle="Dia da Semana"
                setFilters={setFilters}
              />
            </Col>
            <Col>
              {/* <FilterElement
                filterTitle="Categoria"
                setFilters={setFilters}
                filters={filters}
              /> */}
            </Col>
            <Col></Col>
            <Col>dia da semana</Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}
