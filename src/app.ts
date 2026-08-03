import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import router from './routes/routes';



const app: Express = express();


app.use(express.json());
app.use(cors());

app.use('/api/v1',router);


app.get('/', (req: Request, res: Response) => {
  res.send('JWT Authentication Server is Running...');
});

export default app;