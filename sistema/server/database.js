import mysql from 'mysql2';

const db = mysql.createConnection({
  user: 'root',
  host: 'containers-us-west-126.railway.app',
  password: 'BYEXxb7ZVPocb4H9XWkC',
  database: 'railway',
  port: '5695',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

export default db;
