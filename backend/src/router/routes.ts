import { Router } from "express";

const routes = Router()
import {listAllTransactions,createTransaction,deleteTransaction,updateTransaction,detailTransaction} from '../controllers/TransactionsController';


routes.get('/transactions', listAllTransactions);
routes.post('/transactions', createTransaction);
routes.delete('/transactions/:id', deleteTransaction);
routes.put('/transactions/:id', updateTransaction);
routes.get('/transactions/:id', detailTransaction);



export default routes