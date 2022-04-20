import './style.scss';
import { Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import Filter from '../../components/filter';
export default function Home() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <Filter />
      <Row>
        <Col></Col>
      </Row>
    </>
  );
}
