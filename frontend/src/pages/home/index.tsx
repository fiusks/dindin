import './style.scss';
import { Row, Col } from 'react-bootstrap';
import Filter from '../../components/filter';
import TransactionTable from '../../components/transactionTable';
import ResumeTransactions from '../../components/resumeTransactions';

export default function Home() {
  return (
    <>
      <Row className="home-container">
        <Col>
          <Row>
            <Col>
              <Filter />
            </Col>
          </Row>
          <Row>
            <Col>
              <TransactionTable />
            </Col>
          </Row>
        </Col>
        <Col className="resume-col" md={12} lg={4} xl={4} xxl={3}>
          <ResumeTransactions />
        </Col>
      </Row>
    </>
  );
}
