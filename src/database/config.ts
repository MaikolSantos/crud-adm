import { Client } from "pg";
import "dotenv/config";

const client = new Client({
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

export default client;
