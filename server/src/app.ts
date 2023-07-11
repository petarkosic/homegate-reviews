import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const PORT: string | number = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello from api');
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
