import dotenv from 'dotenv';
dotenv.config({ path: './src/api/.env' });
import express from 'express';
const router = express.Router();
import db from './../database.js';

router.get('/', async (req, res) => {
  const sql = 'SELECT * FROM pasutijumi';

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.send(result);
    }
  });
});

router.post('/', async (req, res) => {
  // const recipe = new Recipe({
  //   title: req.body.title,
  //   ingredients: req.body.ingredients,
  //   method: req.body.method,
  //   time: req.body.time,
  // });
  // try {
  //   const newRecipe = await recipe.save();
  //   res.status(201).json(newRecipe);
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
});

export default router;

// app.get("/employees", (req, res) => {
//   db.query("SELECT * FROM employees", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });
