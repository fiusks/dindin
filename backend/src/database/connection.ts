import mongoose from "mongoose";
const mongoDB = 'mongodb://localhost:27017/transactions';

const dbConnection = ()=>{
    try {
        mongoose.connect(mongoDB,()=>{
            console.log("DB connected")
        });
        
    } catch (error) {
        console.log(error)
    }
    mongoose.connection.on('error',err=>{
        console.log(err)
    })
}

export default dbConnection;