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

export default router;
