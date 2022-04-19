import { Router } from "express";

const routes = Router()
import {listAllTransactions,createTransaction,deleteTransaction,updateTransaction,updateTransactionProperty,detailTransaction} from '../controllers/TransactionsController';


routes.get('/transactions', listAllTransactions);
routes.post('/transactions', createTransaction);
routes.delete('/transactions/:id', deleteTransaction);
routes.put('/transactions/:id', updateTransaction);
routes.patch('/transactions/:id', updateTransactionProperty);
routes.get('/transactions/:id', detailTransaction);



export default routes