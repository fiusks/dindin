import './style.scss';
import { Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import filterIcon from '../../assets/images/filter-icon.svg';

export default function Filter() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <Row>
      <Col>
        <Button className="filter-btn">
          <img src={filterIcon} alt="filter icon" className="img-fluid" />
          Filtrar
        </Button>

        <Row>
          <Col></Col>
        </Row>
      </Col>
    </Row>
  );
}
