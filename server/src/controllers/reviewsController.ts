import { Request, Response } from 'express';
import { pool } from '../db/db';
import { config } from 'dotenv';

config();

type Error = {
	message: string;
};

const leaveReview = async (req: Request, res: Response) => {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');
		let { user_id, apartment_id, review_text, star_rating } = req.body;

		if (!review_text || star_rating == null) {
			return res.status(400).json({
				message: 'Please enter all fields.',
			});
		}

		review_text = `"${review_text}"`;

		const queryString = `
        INSERT INTO reviews (user_id, apartment_id, review_text, star_rating) VALUES ($1, $2, $3, $4);
        `;

		await client.query(queryString, [
			user_id,
			apartment_id,
			review_text,
			star_rating,
		]);

		await client.query('COMMIT');
		res.json({
			message: 'success',
		});
	} catch (err) {
		await client.query('ROLLBACK');
		const error = err as Error;
		console.error(error.message);
		res.status(500).json({ message: 'Server error' });
	} finally {
		client.release();
	}
};

export { leaveReview };
