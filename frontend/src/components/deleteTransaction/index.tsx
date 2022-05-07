import './styles.scss';
import deleteIcon from '../../assets/images/deleteIcon.svg';
import arrowUp from '../../assets/images/arrowUp.svg';
import { useState } from 'react';
import { TransactionContextType } from '../../@types/transactions';
import { TransactionContext } from '../../contexts/transactionContext';
import { useContext } from 'react';

type Props = {
  id: number;
};
export default function DeleteModal({ id }: Props) {
  const { deleteTransaction } = useContext(
    TransactionContext
  ) as TransactionContextType;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    deleteTransaction(id);
    handleClose();
  };

  return (
    <>
      <img src={deleteIcon} alt="delete Icon" onClick={handleShow} />

      {show && (
        <div className="delete-modal-container">
          <img src={arrowUp} alt="arrow Up" />
          <p>Apagar Item?</p>
          <div className="buttons-container">
            <button onClick={handleSubmit} className="accept-btn">
              Sim
            </button>
            <button onClick={handleClose} className="reject-btn">
              Não
            </button>
          </div>
        </div>
      )}
    </>
  );
}
