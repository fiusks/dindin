import './styles.scss';
import { Row, Col } from 'react-bootstrap';
import { TransactionContext } from '../../contexts/transactionContext';
import { useContext } from 'react';
import { TransactionContextType } from '../../@types/transactions';
import AddTransaction from '../addTransaction';

export default function ResumeTransactions() {
  const { resumeTransaction } = useContext(
    TransactionContext
  ) as TransactionContextType;
  const { income, outcome, balance } = resumeTransaction();
  return (
    <div className="resume-component">
      <div className="resume-container">
        <h3>Resumo</h3>
        <Row>
          <Col>
            <h4>Entradas</h4>
          </Col>
          <Col>
            <h4 className="credit">{`R$ ${income.toFixed(2)}`}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Saídas</h4>
          </Col>
          <Col>
            <h4 className="debit">{`R$ ${outcome.toFixed(2)}`}</h4>
          </Col>
        </Row>
        <Row className="balance-row">
          <Col>
            <h4 className="balance">Saldo</h4>
          </Col>
          <Col>
            <h4 className="balance-value">{`R$ ${balance.toFixed(2)}`}</h4>
          </Col>
        </Row>
      </div>
      <AddTransaction />
    </div>
  );
}
