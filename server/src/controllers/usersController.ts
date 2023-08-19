import { Request, Response, NextFunction } from 'express';
import { pool } from '../db/db';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

config();

type Error = {
	message: string;
};

// login
const login = async (req: Request, res: Response, next: NextFunction) => {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');

		const { email: user_email, password } = req.body;

		const user = await client.query(
			'SELECT user_id, first_name, last_name, email, password, registered_at FROM users WHERE email = $1',
			[user_email]
		);

		if (user.rows.length === 0) {
			return res.status(401).json({ message: 'Invalid Credentials' });
		}

		const validPassword = await bcrypt.compare(password, user.rows[0].password);
		if (!validPassword) {
			return res.status(401).json({ message: 'Invalid Credential' });
		}

		const { user_id, first_name, last_name, email, registered_at } =
			user.rows[0];

		await client.query('COMMIT');

		const accessToken = generateAccessToken(user.rows[0]);

		res.status(200).json({
			user_id,
			first_name,
			last_name,
			email,
			registered_at,
			accessToken,
			message: 'User logged in',
		});
	} catch (err) {
		await client.query('ROLLBACK');
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: 'Server error' });
	} finally {
		client.release();
	}

	next();
};

function generateAccessToken(user: any) {
	return jwt.sign(
		{ userId: user.user_id },
		process.env.ACCESS_TOKEN_SECRET as string,
		{
			expiresIn: '1h',
		}
	);
}

export { login };
