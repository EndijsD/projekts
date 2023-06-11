import express from 'express';
const router = express.Router();
import db from './database.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

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
    `select preces_id, nosaukums, cena, attelu_celi, pieejamiba from preces inner join precu_specifikacija on preces.id_precu_specifikacija = precu_specifikacija.precu_specifikacija_id where kategorija = ?`,
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

router.get('/user_address', authenticateToken, async (req, res) => {
  const user_id = req.data.lietotaji_id;
  const address_id = req.data.id_adreses;

  db.query(
    `select lietotaji_id, vards, uzvards, talrunis, epasts, adreses.* from lietotaji inner join adreses on lietotaji.id_adreses = adreses.adreses_id where lietotaji_id = ? and adreses_id = ?`,
    [user_id, address_id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.send(result[0]);
      }
    }
  );
});

router.get('/orders', authenticateToken, async (req, res) => {
  const user_id = req.data.lietotaji_id;

  db.query(
    `select * from pasutijumi where id_lietotaji = ? order by izveidosanas_datums desc`,
    user_id,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.send(result);
      }
    }
  );
});

router.get('/pasutijumi_preces/:id', async (req, res) => {
  const id = req.params.id;

  db.query(
    `select * from pasutijumi_preces inner join preces on id_preces = preces_id where id_pasutijumi = ?`,
    id,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.send(result);
      }
    }
  );
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    req.data = data;
    next();
  });
}

export default router;
