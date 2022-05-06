import {Request} from 'express'

export interface TransactionDocument {
  id?:number,
  date:Date,
  weekDay?:string,
  description:string,
  amount:number,
  category:string,
  type:"credit"|"debit",
}

export interface RequestTransaction extends Request{
  body:TransactionDocument 
}