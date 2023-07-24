import { Request, Response } from 'express';
import pool from './../db/db';

const getApartment = async (req: Request, res: Response) => {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');

		const { id } = req.params;

		const queryString = `
		SELECT
			a.apartment_id,
			a.cost_of_rent,
			a.number_of_rooms,
			a.living_space_sqm,
			a.address,
			a.availability,
			a.description,
			a.features_and_furnishings,
			r.review_id,
			r.review_text,
			r.date_of_review,
			r.star_rating,
			u.user_id AS reviewer_id,
			u.first_name AS reviewer_first_name,
			u.last_name AS reviewer_last_name,
			u.email AS reviewer_email
		FROM
			apartments AS a
		LEFT JOIN
			reviews AS r ON a.apartment_id = r.apartment_id
		LEFT JOIN
			users AS u ON r.user_id = u.user_id
		WHERE
			a.apartment_id = $1;
		`;

		const apartmentQuery = await client.query(queryString, [id]);

		await client.query('COMMIT');

		res.json({
			message: 'success',
			data: apartmentQuery.rows[0] || [],
		});
	} catch (err) {
		await client.query('ROLLBACK');
		console.error(err);
		res.status(500).json('Server error');
	} finally {
		client.release();
	}
};

export { getApartment };
