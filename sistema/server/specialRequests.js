import express from 'express';
const router = express.Router();
import db from './database.js';
import bcrypt from 'bcrypt';

router.get('/dashboard', async (req, res) => {
  const tableResults = {
    lietotaji: null,
    pasutijumi: null,
    preces: null,
    atsauksmes: null,
  };

  Object.keys(tableResults).map((table) => {
    db.query(`SELECT count(${table}_id) FROM ${table}`, (err, result) => {
      tableResults[table] = result ? Object.values(result[0])[0] : err.message;

      if (!hasNull(tableResults)) res.send(tableResults);
    });
  });
});

function hasNull(target) {
  for (var member in target) {
    if (target[member] == null) return true;
  }
  return false;
}

router.post('/adminLogin', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    'SELECT * FROM administratori WHERE epasts=?',
    email,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        if (result[0]) {
          const isCorrectPass = bcrypt.compareSync(password, result[0].parole);

          if (isCorrectPass) res.send(result);
          else res.send([]);
        } else {
          res.send([]);
        }
      }
    }
  );
});

export default router;
