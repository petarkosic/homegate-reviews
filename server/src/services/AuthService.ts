import { Pool, PoolClient } from 'pg';
import { config } from 'dotenv';
import { pool as clientPool } from '../db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

config();

type Error = {
	message: string;
};

interface UserObject {
	user_id?: number;
	first_name?: string;
	last_name?: string;
	email?: string;
	registered_at?: string;
	access_token?: string;
	message: string;
}

class ReviewService {
	private pool: Pool;

	constructor() {
		this.pool = clientPool;
	}

	async connect(): Promise<PoolClient> {
		return this.pool.connect();
	}

	async login(
		client: PoolClient,
		user_email: string,
		password: string
	): Promise<UserObject> {
		try {
			await client.query('BEGIN');

			const queryString = `SELECT user_id, first_name, last_name, email, password, registered_at FROM users WHERE email = $1;`;

			const user = await client.query(queryString, [user_email]);

			if (user.rows.length === 0) {
				return { message: 'Invalid Credentials' };
			}

			const validPassword = await bcrypt.compare(
				password,
				user.rows[0].password
			);

			if (!validPassword) {
				return { message: 'Invalid Credentials' };
			}

			const { user_id, first_name, last_name, email, registered_at } =
				user.rows[0];

			await client.query('COMMIT');

			const accessToken = generateAccessToken(user.rows[0]);

			return {
				user_id,
				first_name,
				last_name,
				email,
				registered_at,
				access_token: accessToken,
				message: 'User logged in',
			};
		} catch (err) {
			await client.query('ROLLBACK');
			const error = err as Error;
			console.error(error.message);
			throw new Error('Server error');
		}
	}
}

export default new ReviewService();

function generateAccessToken(user: any) {
	return jwt.sign(
		{ userId: user.user_id },
		process.env.ACCESS_TOKEN_SECRET as string,
		{
			expiresIn: '1h',
		}
	);
}
