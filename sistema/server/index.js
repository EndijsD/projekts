import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express from 'express';
const app = express();
import cors from 'cors';
import routes from './routes.js';

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(process.env.PORT || process.env.SERVER_PORT, () =>
  console.log(
    `Server is running on port ${process.env.PORT || process.env.SERVER_PORT}`
  )
);
