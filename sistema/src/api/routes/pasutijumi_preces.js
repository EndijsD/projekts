import dotenv from 'dotenv';
dotenv.config({ path: './src/api/.env' });
import express from 'express';
const router = express.Router();
import db from '../database.js';

router.get('/', async (req, res) => {
  const sql = 'SELECT * FROM pasutijumi_preces';

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.send(result);
    }
  });
});

// router.post('/', async (req, res) => {
//   const recipe = new Recipe({
//     title: req.body.title,
//     ingredients: req.body.ingredients,
//     method: req.body.method,
//     time: req.body.time,
//   });

//   try {
//     const newRecipe = await recipe.save();
//     res.status(201).json(newRecipe);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.post("/create", (req, res) => {
//   const name = req.body.name;
//   const age = req.body.age;
//   const country = req.body.country;
//   const position = req.body.position;
//   const wage = req.body.wage;

//   db.query(
//     "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
//     [name, age, country, position, wage],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });

// router.patch('/:id', async (req, res) => {
//   if (req.body.title != null) res.recipe.title = req.body.title;
//   if (req.body.ingredients != null)
//     res.recipe.ingredients = req.body.ingredients;
//   if (req.body.method != null) res.recipe.method = req.body.method;
//   if (req.body.time != null) res.recipe.time = req.body.time;

//   try {
//     const updatedRecipe = await res.recipe.save();
//     res.json(updatedRecipe);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM pasutijumi_preces WHERE pasutijumi_preces_id = ?',
    id,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: 'Deleted entry: ' + id });
      }
    }
  );
});

export default router;
