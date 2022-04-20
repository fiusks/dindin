import './style.scss';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/images/logo.svg';

export default function Layout() {
  return (
    <Container fluid className="p-0 layout-container">
      <Row className="layout-header">
        <Col>
          <div className="header-container">
            <img src={logo} alt="App logo" />
            <h1>Dindin</h1>
          </div>
        </Col>
      </Row>
      <Row className="layout-body">
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
