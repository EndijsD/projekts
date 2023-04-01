import dotenv from 'dotenv';
dotenv.config({ path: './src/api/.env' });
import express from 'express';
const app = express();
import cors from 'cors';
import pasutijumi from './routes/pasutijumi.js';

app.use(cors());
app.use(express.json());
app.use('/pasutijumi', pasutijumi);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is running on port ${process.env.SERVER_PORT}.`)
);
