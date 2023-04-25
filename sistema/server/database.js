import mysql from 'mysql2';

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'Parole1',
  database: 'erd',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

export default db;
