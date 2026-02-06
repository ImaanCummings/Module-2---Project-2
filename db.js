import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "moderntech_solutions_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;
