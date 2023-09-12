import { Pool, PoolClient } from 'pg';
import { pool as clientPool } from '../db/db';

type Error = {
	message: string;
};

interface Apartment {
	apartment_id: string;
	cost_of_rent: string;
	number_of_rooms: number;
	living_space_sqm: string;
	address: string;
	availability: string;
	description: string;
	features_and_furnishings: string[];
	review_id: number;
	review_text: string;
	date_of_review: string;
	star_rating: number;
	reviewer_id: number;
	reviewer_first_name: string;
	reviewer_last_name: string;
	reviewer_email: string;
	reviewer_registered_at: string;
}

class ApartmentService {
	private pool: Pool;

	constructor() {
		this.pool = clientPool;
	}

	async connect(): Promise<PoolClient> {
		return this.pool.connect();
	}

	async getApartment(client: PoolClient, id: string): Promise<Apartment[]> {
		try {
			await client.query('BEGIN');

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
                u.email AS reviewer_email,
                u.registered_at AT TIME ZONE 'UTC+00:00' AS reviewer_registered_at
            FROM
                apartments AS a
            LEFT JOIN
                reviews AS r ON a.apartment_id = r.apartment_id
            LEFT JOIN
                users AS u ON r.user_id = u.user_id
            WHERE
                a.apartment_id = $1;
            `;

			const apartment = await client.query(queryString, [id]);

			await client.query('COMMIT');

			return apartment.rows;
		} catch (err) {
			await client.query('ROLLBACK');
			const error = err as Error;
			console.error(error.message);
			throw new Error('Server error');
		}
	}
}

export default new ApartmentService();
