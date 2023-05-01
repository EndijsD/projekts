import express from 'express';
const router = express.Router();
import db from './database.js';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

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
        const resultObj = result[0];

        if (resultObj) {
          const isCorrectPass = bcrypt.compareSync(password, resultObj.parole);

          if (isCorrectPass) {
            const sessionID = v4();

            setSession(sessionID, resultObj.administratori_id);
            const resultWithSession = { ...resultObj, sesija: sessionID };
            res.send(resultWithSession);
          } else {
            res.send(null);
          }
        } else {
          res.send(null);
        }
      }
    }
  );
});

const setSession = (sessionID, id) => {
  db.query(
    `UPDATE administratori SET sesija = ? WHERE administratori_id = ?`,
    [sessionID, id],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Set session');
      }
    }
  );
};

router.delete('/session', async (req, res) => {
  const sessionID = req.body.sessionID;

  db.query(
    'SELECT * FROM administratori WHERE sesija=?',
    sessionID,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        const resultObj = result[0];

        if (resultObj) setSession(null, resultObj.administratori_id);
      }
    }
  );
});

router.get('/admin/:session', async (req, res) => {
  const sessionID = req.params.session.slice(1);

  db.query(
    `SELECT * FROM administratori WHERE sesija = ?`,
    sessionID,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json(result[0]);
      }
    }
  );
});

export default router;
