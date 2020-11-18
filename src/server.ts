import express from 'express';
import Routes from './routes';
import './database';
import 'reflect-metadata';

const app = express();
app.use(express.json());
app.use(Routes);
app.listen(3333, () => {
  console.log('Server start at port 3333');
});
