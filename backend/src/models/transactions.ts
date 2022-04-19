import {Schema,model} from "mongoose";

interface TransactionDocument {
  date:Date,
  week_day:string,
  description:string,
  value:number,
  category:string,
  type:"credit"|"debit",
  transactionID:number
}

const transactionSchema = new Schema<TransactionDocument>(
    {
        date:{type:Date,required:true},
        week_day:{type:String,required:true},
        description:{type:String,required:true},
        value:{type:Number,required:true},
        category:{type:String,required:true},
        type:{type:String,enum:["credit","debit"],required:true},
        transactionID:{type:Number,required:true}
    },
    {timestamps:true}
)

transactionSchema.index({transactionID:1},{unique:true})

const Transaction = model<TransactionDocument>('Transaction',transactionSchema)

export default Transaction
