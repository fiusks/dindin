import { Request, Response } from "express";
import knex from'../database/connection'
import { RequestTransaction,TransactionDocument} from '../models/transactions'

  export const listAllTransactions = async (req:Request, res:Response)=> {
    try {
      const transaction = await knex("transactions")
      return res.status(200).json(transaction);

    } catch (error) {
      console.log(error)
      return res.status(400).json("deu ruim");
    }
  }

  export const createTransaction = async (req:RequestTransaction, res:Response)=> {
    try {
      const {date,description,amount,category,type} = req.body
     
      const newTransaction = {
        date:new Date(date),
        description,
        amount:amount,
        category,
        type,
      }

      await knex("transactions").insert(newTransaction)
      
      return res.status(201).json({message:"Transação cadastrada com sucesso"});
    } catch (error) {
      console.log(error)
      return res.status(404).json(error)
    }
  }

  export const deleteTransaction = async (req:RequestTransaction, res:Response)=> {
    try {
      
      const { id }= req.params;
      const deletedTransaction = await knex("transactions").del().where('id',id)

      if(!deletedTransaction){
        return res.status(404).json({message:"Transação não existe"})
      }

      return res.status(200).json({message:"Transação excluída com sucesso"});
    } catch (error) {
      console.log(error)
      return res.status(400).json("Falha ao deletar a transação");
    }
  }

  export const updateTransaction = async (req:RequestTransaction, res:Response)=> {
    try {
      const { id } = req.params;

      const {date,description,amount,category,type} = req.body

      const updatedTransaction = {
        date:new Date(date),
        description,
        amount:amount,
        category,
        type,
      }
      
      await knex("transactions").where({id}).update(updatedTransaction)

      
      return res.status(200).json("Transação atualizada com sucesso");
    } catch (error) {
      console.log(error)
      return res.status(400).json("Falha ao atualizar a transação");
    }
  }

  export const listFilteredTransactions = async (req:Request,res:Response)=>{
    try {
      const {categories,minValue,maxValue,days} = req.body
      let filteredList:TransactionDocument[] =[]
      if(categories.length!==0){
        if(minValue && maxValue){
          filteredList = await knex("transactions").whereIn('category',categories).andWhereBetween('amount',[minValue,maxValue])
        }else if(minValue){
          filteredList = await knex("transactions").whereIn('category',categories).andWhere('amount',">",minValue)
        }else if(maxValue){
          filteredList = await knex("transactions").whereIn('category',categories).andWhere('amount',"<",maxValue)
        }else{
          filteredList = await knex("transactions").whereIn('category',categories)
        }
      }else{
        if(minValue && maxValue){
          filteredList = await knex("transactions").whereBetween('amount',[minValue,maxValue])
        }else if(minValue){
          filteredList = await knex("transactions").where('amount',">",minValue)
        }else if(maxValue){
          filteredList = await knex("transactions").where('amount',"<",maxValue)
        }else{
          filteredList = await knex("transactions")
        }
      }
  
      
     filteredList.map((transaction:TransactionDocument)=>{
        transaction.weekDay = transaction.date.toLocaleDateString('pt-BR',{weekday:"long"}).replace('-feira',"").toLowerCase()
      })
      
      if(days.length!==0){
        filteredList=filteredList.filter((transaction:TransactionDocument)=>{
          return days.find((day:string)=>day===transaction.weekDay)
        }
        )}else[]


      
      return res.status(200).json(filteredList);

    } catch (error) {
      console.log(error)
      return res.status(400).json("deu ruim");
    }
  }
