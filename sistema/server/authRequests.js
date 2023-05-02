import express from 'express';
const router = express.Router();
import db from './database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

router.post('/login', async (req, res) => {
  const table = req.body.table;
  const email = req.body.email;
  const password = req.body.password;

  db.query(`SELECT * FROM ${table} WHERE epasts=?`, email, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      const resultObj = result[0];

      if (resultObj) {
        const isCorrectPass = bcrypt.compareSync(password, resultObj.parole);

        if (isCorrectPass) {
          const accessToken = jwt.sign(
            resultObj,
            process.env.ACCESS_TOKEN_SECRET
          );
          res.send({ accessToken: accessToken });
        } else {
          res.send(null);
        }
      } else {
        res.send(null);
      }
    }
  });
});

router.get('/verify', authenticateToken, (req, res) => {
  res.sendStatus(200);
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
