import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import Routes from './routes';
import './database';
import 'reflect-metadata';
import AppError from './errors/AppError';
import uploadConfig from './config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(Routes);
app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }
    console.log(error.message);
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
);
app.listen(3333, () => {
  console.log('Server start at port 3333');
});
