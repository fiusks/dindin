import './styles.scss';
import editIcon from '../../assets/images/editIcon.svg';
import { useState, useContext } from 'react';
import TransactionModal from '../transactionModal';
import { TransactionContextType } from '../../@types/transactions';
import { TransactionContext } from '../../contexts/transactionContext';

type Props = {
  id: number;
};

export default function EditTransaction({ id }: Props) {
  const { transactions, updateTransaction } = useContext(
    TransactionContext
  ) as TransactionContextType;
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const initialState = transactions.find(
    (transaction) => transaction.id === id
  ) || {
    amount: '',
    category: '',
    date: '',
    description: '',
    type: 'credit',
  };
  return (
    <>
      <img src={editIcon} alt="edit Icon" onClick={handleShow} />
      <TransactionModal
        action="Editar"
        actionFunction={updateTransaction}
        show={show}
        setShow={setShow}
        initialState={initialState}
      />
    </>
  );
}
