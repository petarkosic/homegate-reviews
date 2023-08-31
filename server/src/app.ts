import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import apartmentsRoute from './routes/apartmentsRoute';
import usersRoute from './routes/usersRoute';
import reviewsRoute from './routes/reviewsRoute';

dotenv.config();
const PORT: string | number = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello from api');
});

app.use('/apartment', apartmentsRoute);
app.use('/users', usersRoute);
app.use('/reviews', reviewsRoute);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
