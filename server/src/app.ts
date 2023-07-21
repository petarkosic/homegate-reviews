import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import apartmentRoute from './../routes/apartmentRoute';

dotenv.config();
const PORT: string | number = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello from api');
});

app.use('/apartment', apartmentRoute);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
