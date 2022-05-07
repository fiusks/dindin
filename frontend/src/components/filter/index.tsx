import './styles.scss';
import { Row, Col, Button } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { TransactionContext } from '../../contexts/transactionContext';
import { TransactionContextType } from '../../@types/transactions';
import { FilterContextType } from '../../@types/filters';
import { FilterContext } from '../../contexts/filterContext';
import filterIcon from '../../assets/images/filter-icon.svg';
import FilterElement from '../filterElement';

export default function Filter() {
  const [showFilter, setShowFilter] = useState(false);
  const { showFilteredTransactions } = useContext(
    TransactionContext
  ) as TransactionContextType;
  const { filters, setActiveFilters } = useContext(
    FilterContext
  ) as FilterContextType;
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  useEffect(() => {
    const updateFilterList = { ...filters, minValue, maxValue };
    setActiveFilters(updateFilterList);
  }, [minValue, maxValue]);

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
                filterList={filters.weekday}
              />
            </Col>
            <Col>
              <FilterElement
                filterTitle="Categoria"
                filterList={filters.categories}
              />
            </Col>
            <Col className="filterByValue">
              <h6>Valor</h6>
              <div className="minMax-filter-container">
                <label>Min</label>
                <input
                  onChange={(e) => setMinValue(e.target.value)}
                  value={minValue}
                />
                <label>Max</label>
                <input
                  onChange={(e) => setMaxValue(e.target.value)}
                  value={maxValue}
                />
              </div>
            </Col>
            <Col>
              <Button onClick={showFilteredTransactions}>Aplicar Filtro</Button>
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}
