import express from 'express';
const app = express();
import cors from 'cors';
import routes from './routes.js';

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(process.env.PORT || 3001, () =>
  console.log(`Server is running on port ${process.env.PORT || 3001}`)
);
