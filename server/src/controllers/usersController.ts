import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';

type Error = {
	message: string;
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	const client = await AuthService.connect();

	try {
		const { email: user_email, password } = req.body;

		const user = await AuthService.login(client, user_email, password);

		if (user.message == 'Invalid Credentials') {
			return res.status(401).json({ message: user.message });
		}

		const {
			user_id,
			first_name,
			last_name,
			email,
			registered_at,
			access_token,
			message,
		} = user;

		res.status(200).json({
			user_id,
			first_name,
			last_name,
			email,
			registered_at,
			access_token,
			message,
		});
	} catch (err) {
		const error = err as Error;
		res.status(500).json({ message: error.message });
	} finally {
		client.release();
	}
	next();
};

export { login };
