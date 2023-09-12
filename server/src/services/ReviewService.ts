import { Pool, PoolClient } from 'pg';
import { config } from 'dotenv';
import { pool as clientPool } from '../db/db';

config();

type Error = {
	message: string;
};

class ReviewService {
	private pool: Pool;

	constructor() {
		this.pool = clientPool;
	}

	async connect(): Promise<PoolClient> {
		return this.pool.connect();
	}

	async leaveReview(
		client: PoolClient,
		user_id: number,
		apartment_id: number,
		review_text: string,
		star_rating: number
	): Promise<void> {
		try {
			await client.query('BEGIN');

			const queryString = `INSERT INTO reviews (user_id, apartment_id, review_text, star_rating) VALUES ($1, $2, $3, $4);`;

			await client.query(queryString, [
				user_id,
				apartment_id,
				review_text,
				star_rating,
			]);

			await client.query('COMMIT');
		} catch (err) {
			await client.query('ROLLBACK');
			const error = err as Error;
			console.error(error.message);
			throw new Error('Server error');
		}
	}
}

export default new ReviewService();
