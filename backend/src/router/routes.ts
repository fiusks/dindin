import { Router } from "express";

const routes = Router()
import {listAllTransactions,createTransaction,deleteTransaction,updateTransaction,listFilteredTransactions} from '../controllers/TransactionsController';


routes.get('/transactions', listAllTransactions);
routes.post('/transactions', createTransaction);
routes.delete('/transactions/:id', deleteTransaction);
routes.put('/transactions/:id', updateTransaction);
routes.post('/filter',listFilteredTransactions)



export default routes