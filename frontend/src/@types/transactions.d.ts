export interface ITransaction {
  id?: number;
  date: string;
  description: string;
  category: string;
  amount: string;
  type: 'credit' | 'debit';
}

export interface IResumeTransactions {
  income: number;
  outcome: number;
  balance: number;
}

export type TransactionContextType = {
  transactions: ITransaction[];
  showTransactions: () => void;
  showFilteredTransactions: () => void;
  resumeTransaction: () => IResumeTransactions;
  saveTransaction: (transaction: ITransaction) => void;
  updateTransaction: (transaction: ITransaction) => void;
  deleteTransaction: (id: number) => void;
};
