import { ITransaction, TransactionContextType } from '../@types/transactions';
import { FilterContextType } from '../@types/filters';
import { createContext, useState, FC, ReactNode, useContext } from 'react';
import { FilterContext } from './filterContext';

type Props = {
  children?: ReactNode;
};

export const TransactionContext = createContext<TransactionContextType | null>(
  null
);

const TransactionProvider: FC<Props> = ({ children }) => {
  const { updateCategoryList, activeFilters } = useContext(
    FilterContext
  ) as FilterContextType;

  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const saveTransaction = async (transaction: ITransaction) => {
    const newTransaction: ITransaction = {
      date: transaction.date,
      description: transaction.description,
      category: transaction.category,
      amount: transaction.amount,
      type: transaction.type,
    };

    try {
      const response = await fetch(`http://localhost:3001/transactions/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      const data = await response.json();
      if (data.message === 'Transação cadastrada com sucesso') {
        const newTransactionList = [...transactions, newTransaction];
        setTransactions(newTransactionList);
        updateCategoryList(newTransactionList);
      }
    } catch (error) {
      console.log(error);
    }

    const newTransactionList = [...transactions, newTransaction];
    showTransactions();
    updateCategoryList(newTransactionList);
  };
  const deleteTransaction = async (id: number) => {
    const newTransactionList = transactions.filter(
      (transaction: ITransaction) => transaction.id !== id
    );
    try {
      const response = await fetch(`http://localhost:3001/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.message === 'Transação excluída com sucesso') {
        setTransactions(newTransactionList);
        updateCategoryList(newTransactionList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateTransaction = async (updateTransaction: ITransaction) => {
    const { id } = updateTransaction;

    try {
      const response = await fetch(`http://localhost:3001/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updateTransaction),
      });
      const data = await response.json();
      if (data.message === 'Transação atualizada com sucesso') {
        showTransactions();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resumeTransaction = () => {
    const income = transactions.reduce(
      (acc, transaction) =>
        transaction.type === 'credit' ? acc + Number(transaction.amount) : acc,
      0
    );
    const outcome = Math.abs(
      transactions.reduce(
        (acc, transaction) =>
          transaction.type === 'debit' ? acc + Number(transaction.amount) : acc,
        0
      )
    );
    const balance = Number(income) - Number(outcome);
    return { income, outcome, balance };
  };
  const showTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/transactions/`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const transactions: ITransaction[] = await response.json();
      if (transactions.length !== 0) {
        setTransactions(transactions);
        updateCategoryList(transactions);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showFilteredTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/filtertransactions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(activeFilters),
      });
      const filteredTransactions: ITransaction[] = await response.json();
      setTransactions(filteredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        showTransactions,
        showFilteredTransactions,
        saveTransaction,
        deleteTransaction,
        updateTransaction,
        resumeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
