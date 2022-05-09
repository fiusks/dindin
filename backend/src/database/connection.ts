import * as dotenv from 'dotenv'
dotenv.config()

const knex = require("knex")({
    client: "pg",
    version: "^8.7.3",
    connection: {
      host: process.env.DB_HOST||"localhost",
      port: 5432,
      user: process.env.DB_USER || process.env.DB_LOCAL_USER,
      password: process.env.DB_PASSWORD||process.env.DB_LOCAL_PASSWORD,
      database: process.env.DB_DATABASE || process.env.DB_LOCAL_DATABASE,
    },
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  export default knex