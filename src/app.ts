import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send('Hello World!' + a);
});

export default app;
