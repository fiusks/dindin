import * as dotenv from 'dotenv'
import express from "express";
import log from './logger'
import cors from "cors"
import routes from './router/routes'

const app = express();

dotenv.config()

app.use(cors());

app.use(express.json());

log.info(`Server listing at http://${process.env.HOST}:${process.env.PORT||3001}`)

app.use(routes);



export default app;
