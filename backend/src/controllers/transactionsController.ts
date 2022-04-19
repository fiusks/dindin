import { Request, Response } from "express";
import Transaction from "../models/transactions";

  export const listAllTransactions = async (req:Request, res:Response):Promise<void|any>=> {
    try {
      const transaction = await Transaction.find().lean()
      return res.status(200).json(transaction);

    } catch (error) {
      console.log(error)
      return res.status(400).json("deu ruim");
    }
  }

  export const createTransaction = async (req:Request, res:Response):Promise<void|any>=> {
    try {
      const { body } = req;
      Transaction.create(body)
      return res.status(200).json("create trans");
    } catch (error) {
      return res.status(400).json("Falha ao criar uma transação");
    }
  }

  export const deleteTransaction = async (req:Request, res:Response):Promise<void|any>=> {
    try {
      const { id } = req.params;
      const transaction = await Transaction.deleteOne({transactionID:id}).lean()
      return res.status(200).json("Transação deletada com sucesso");
    } catch (error) {
      return res.status(400).json("Falha ao deletar a transação");
    }
  }

  export const updateTransaction = async (req:Request, res:Response):Promise<void|any>=> {
    try {
      const { id } = req.params;
      const { body } = req;
      const transaction = await Transaction.findOneAndUpdate({transactionID:id},body).lean()
      console.log(transaction)

      if(!transaction){
        return res.status(404).json("Ocorreu um erro ao atualizar a transação. Tente novamente");  
      }
      return res.status(200).json("Transação atualizada com sucesso");
    } catch (error) {
      console.log(error)
      return res.status(400).json("Falha ao atualizar a transação");
    }
  }

  export const detailTransaction = async(req:Request, res:Response):Promise<void|any>=> {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findOne({transactionID:id}).lean()
      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(400).json("Falha ao detalhar a transação");
    }
  }
