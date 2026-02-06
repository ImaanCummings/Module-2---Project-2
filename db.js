import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

<<<<<<< HEAD
export const pool = mysql.createPool({
  host: "localhost",      
  user: "root",           
  password: "",           
  database: "moderntech_solutions_database"   
=======
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "moderntech_solutions_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
>>>>>>> 94f23bdd2abf423178854bc78a1a2495fa4f9b54
});


