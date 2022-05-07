import './styles.scss';
import { Table } from 'react-bootstrap';
import DeleteModal from '../deleteTransaction';
import {
  TransactionContextType,
  ITransaction,
} from '../../@types/transactions';
import { TransactionContext } from '../../contexts/transactionContext';
import { useContext, useEffect } from 'react';
import EditTransaction from '../editTransaction';
import { weekdayFormat, dateFormat } from '../../utils/stringFormat';

export default function TransactionTable() {
  const { transactions, showTransactions } = useContext(
    TransactionContext
  ) as TransactionContextType;
  useEffect(() => {
    showTransactions();
  }, []);
  return (
    <Table hover borderless responsive>
      <thead>
        <tr>
          <th className="tHide">Data</th>
          <th className="tHide">Dia da Semana</th>
          <th>Descrição</th>
          <th className="tHide">Categoria</th>
          <th>Valor</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction: ITransaction) => (
          <tr key={transaction.id}>
            <td className="table-date tHide">{dateFormat(transaction.date)}</td>
            <td className="tHide">{weekdayFormat(transaction.date)}</td>
            <td>{transaction.description}</td>
            <td className="tHide">{transaction.category}</td>
            <td className={`${transaction.type}`}>{`R$  ${Number(
              transaction.amount
            ).toFixed(2)}`}</td>
            <td className="table-action-buttons">
              <EditTransaction id={transaction.id!} />
              <DeleteModal id={transaction.id!} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
