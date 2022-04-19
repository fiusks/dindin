import * as dotenv from 'dotenv'
import express from "express";
import log from './logger'
import cors from "cors"
import routes from './router/routes'
import dbConnection from './database/connection'

const app = express();

dotenv.config()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}))

log.info(`Server listing at http://${process.env.HOST}:${process.env.PORT}`)

dbConnection()

app.use(routes);



export default app;
