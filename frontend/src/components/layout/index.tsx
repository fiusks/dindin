import './styles.scss';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/images/logo.svg';
import TransactionProvider from '../../contexts/transactionContext';
import FilterProvider from '../../contexts/filterContext';

export default function Layout() {
  return (
    <FilterProvider>
      <TransactionProvider>
        <Container fluid className="layout-container">
          <Row className="layout-header">
            <Col>
              <div className="header-container">
                <img src={logo} alt="App logo" />
                <h1>Dindin</h1>
              </div>
            </Col>
          </Row>
          <Row className="w-100 layout-body">
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </TransactionProvider>
    </FilterProvider>
  );
}
