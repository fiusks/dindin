import './styles.scss';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import TransactionModal from '../transactionModal';
import {
  TransactionContextType,
  ITransaction,
} from '../../@types/transactions';
import { TransactionContext } from '../../contexts/transactionContext';
import { useContext } from 'react';

export default function AddTransaction() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const initialState: ITransaction = {
    amount: '',
    category: '',
    date: '',
    description: '',
    type: 'credit',
  };
  const { saveTransaction } = useContext(
    TransactionContext
  ) as TransactionContextType;

  return (
    <>
      <Button onClick={handleShow}>Adicionar Transação</Button>
      <TransactionModal
        action="Adicionar"
        actionFunction={saveTransaction}
        show={show}
        setShow={setShow}
        initialState={initialState}
      />
    </>
  );
}
