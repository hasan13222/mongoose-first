import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import cookieParser from 'cookie-parser'
import router from './app/routes';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFoundHandler } from './app/middleware/notFound';


// json parser
app.use(express.json());
// cookie parser
app.use(cookieParser())
// cors middleware
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// not found route handler
app.all('*', notFoundHandler);

app.use(globalErrorHandler);

export default app;
