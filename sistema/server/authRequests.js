import express from 'express';
const router = express.Router();
import db from './database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Tiek izveidots API galapunkts, priekš autorizēšanās
router.post('/login', async (req, res) => {
  // Iegūst vajadzīgās vērtības no padotās informācijas
  const table = req.body.table;
  const email = req.body.email;
  const password = req.body.password;

  // Veic vaicājumu datubāzei, kur iegūst ierakstu ar padoto e-pastu
  db.query(`SELECT * FROM ${table} WHERE epasts=?`, email, (err, result) => {
    if (err) {
      // Ja ir problēma, tad sūta atpakaļ problēmas ziņu
      res.status(500).json({ message: err.message });
    } else {
      // Iegūst pirmā elementa objektu, jo vaicājumi vienmēr ir masīvi ar ierakstiem, ja tādi ir atrasti
      const resultObj = result[0];

      if (resultObj) {
        // Ja ir ieraksts ar norādīto e-pasta adresi, tad vertificējam paroli,
        // ko lietotājs ievadīja, ar to kas ir datubāzē, savādāk nosūtam tukšu objektu
        const isCorrectPass = bcrypt.compareSync(password, resultObj.parole);

        if (isCorrectPass) {
          // Ja parole sakrīt ar to kas ir datubāzē, tad izveidojam JWT un nosūtam to atpakaļ,
          // savādāk nosūtam tukšu objektu
          const accessToken = jwt.sign(
            resultObj,
            process.env.ACCESS_TOKEN_SECRET
          );
          res.send({ accessToken: accessToken });
        } else {
          res.send({});
        }
      } else {
        res.send({});
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
