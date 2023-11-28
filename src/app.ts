import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/module/user/user.route';

const app: Application = express();
//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', userRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Hello Worlddddddddddd!');
};

app.get('/', getAController);

export default app;
