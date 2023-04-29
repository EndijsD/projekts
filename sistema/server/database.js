import mysql from 'mysql2';

const db = mysql.createConnection({
  user: process.env.MYSQLUSER || 'root',
  host: process.env.MYSQLHOST || 'localhost',
  password: process.env.MYSQLPASSWORD || 'Parole1',
  database: process.env.MYSQLDATABASE || 'erd',
  port: process.env.MYSQLPORT || '3306',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

export default db;
