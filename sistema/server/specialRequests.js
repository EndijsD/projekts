import express from 'express';
const router = express.Router();
import db from './database.js';

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

router.get('/popular/:amount', async (req, res) => {
  const amount = req.params.amount;

  db.query(
    `select count(id_preces) as times, id_preces from pasutijumi_preces group by id_preces order by times desc limit ${amount}`,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.send(result);
      }
    }
  );
});

router.get('/newest/:amount', async (req, res) => {
  const amount = req.params.amount;

  db.query(
    `select * from preces order by pievienosanas_datums desc limit ${amount}`,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.send(result);
      }
    }
  );
});

router.post('/category', async (req, res) => {
  const title = req.body.title;

  db.query(
    `select preces_id, nosaukums, cena, attelu_celi from preces inner join precu_specifikacija on preces.id_precu_specifikacija = precu_specifikacija.precu_specifikacija_id where kategorija = ?`,
    title,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.send(result);
      }
    }
  );
});

router.get('/prece/:id', async (req, res) => {
  const id = req.params.id;

  db.query(
    `select * from preces inner join precu_specifikacija on preces.id_precu_specifikacija = precu_specifikacija.precu_specifikacija_id where preces_id = ?`,
    id,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.send(result[0]);
      }
    }
  );
});

export default router;
