import { Router } from "express";

const routes = Router()
import {listAllTransactions,createTransaction,deleteTransaction,updateTransaction,listFilteredTransactions} from '../controllers/transactionsController';


routes.get('/transactions', listAllTransactions);
routes.post('/transactions', createTransaction);
routes.delete('/transactions/:id', deleteTransaction);
routes.put('/transactions/:id', updateTransaction);
routes.post('/filtertransactions',listFilteredTransactions)



export default routes