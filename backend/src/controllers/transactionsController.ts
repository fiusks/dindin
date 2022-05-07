import { Request, Response } from "express";
import knex from'../database/connection'
import { RequestTransaction,TransactionDocument} from '../models/transactions'
import dayjs from "dayjs";
import { RequestFilter } from "../models/filters";

  export const listAllTransactions = async (req:Request, res:Response)=> {
    try {
      const transactions:TransactionDocument[] = await knex("transactions")
      transactions.map((transaction)=>{
       transaction.date=dayjs(transaction.date).format('YYYY-MM-DD').toString()
      })
      
      return res.status(200).json(transactions);

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
        date:date,
        description,
        amount:amount,
        category,
        type,
      }
      
      await knex("transactions").where({id}).update(updatedTransaction)

      
      return res.status(200).json({message:"Transação atualizada com sucesso"});
    } catch (error) {
      console.log(error)
      return res.status(400).json("Falha ao atualizar a transação");
    }
  }

  export const listFilteredTransactions = async (req:RequestFilter,res:Response)=>{
    
    try {
      const {categories,minValue,maxValue,weekday} = req.body
      const statelessCategories = categories.map((category)=>category.filterValue)
      
      let filteredList:TransactionDocument[] =[]
      if(categories.length!==0){
        if(minValue && maxValue){
          filteredList = await knex("transactions").whereIn('category',statelessCategories).andWhereBetween('amount',[minValue,maxValue])
        }else if(minValue){
          filteredList = await knex("transactions").whereIn('category',statelessCategories).andWhere('amount',">",minValue)
        }else if(maxValue){
          filteredList = await knex("transactions").whereIn('category',statelessCategories).andWhere('amount',"<",maxValue)
        }else{
          
          filteredList = await knex("transactions").whereIn('category',statelessCategories)
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
      
      if(weekday.length!==0){
        filteredList.map((transaction)=>{
          transaction.weekday = new Date(transaction.date).toLocaleDateString('pt-BR',{weekday:"long"}).replace('-feira',"").toLowerCase()
          
        })
        
        filteredList=filteredList.filter((transaction)=>{
          return weekday.find((day)=>day.filterValue?.toLowerCase()===transaction.weekday)
        }
        )}
        
        filteredList.map((transaction)=>{
          transaction.date=dayjs(transaction.date).format('YYYY-MM-DD').toString()
         })
         
      return res.status(200).json(filteredList);

    } catch (error) {
      console.log(error)
      return res.status(400).json("deu ruim");
    }
  }
