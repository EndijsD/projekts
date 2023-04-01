import dotenv from 'dotenv';
dotenv.config({ path: './src/api/.env' });
import mysql from 'mysql2';

const db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

export default db;
