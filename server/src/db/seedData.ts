import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import pool from './../db/db';
import { apartmentData, reviewsData, userData } from './data';

config();

async function seedApartments() {
	const client = await pool.connect();
	try {
		await pool.query('BEGIN');

		for (let apartment of apartmentData) {
			const {
				apartment_id,
				cost_of_rent,
				number_of_rooms,
				living_space_sqm,
				address,
				availability,
				description,
				features_and_furnishings,
			} = apartment;

			const queryString = `
                INSERT INTO apartments (apartment_id, cost_of_rent, number_of_rooms, living_space_sqm, address, availability, description, features_and_furnishings) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
            `;

			await client.query(queryString, [
				apartment_id,
				cost_of_rent,
				number_of_rooms,
				living_space_sqm,
				address,
				availability,
				description,
				features_and_furnishings,
			]);

			await client.query('COMMIT');

			console.log(`Inserted apartment ${apartment_id}`);
		}
	} catch (err) {
		await client.query('ROLLBACK');
		console.error(err);
		process.exit(1);
	} finally {
		client.release();
	}
}

async function seedUsers() {
	const client = await pool.connect();
	try {
		await pool.query('BEGIN');

		for (let user of userData) {
			const { first_name, last_name, email, password, registered_at } = user;

			const salt = await bcrypt.genSalt(Number(process.env.SALT));
			const hashedPassword = await bcrypt.hash(password, salt);

			const queryString = `
			INSERT INTO users (first_name, last_name, email, password, registered_at) VALUES ($1, $2, $3, $4, $5);
			`;

			await client.query(queryString, [
				first_name,
				last_name,
				email,
				hashedPassword,
				registered_at,
			]);

			await client.query('COMMIT');

			console.log(`Inserted user ${email}`);
		}
	} catch (err) {
		await client.query('ROLLBACK');
		console.error(err);
		process.exit(1);
	} finally {
		client.release();
	}
}

async function seedReviews() {
	const client = await pool.connect();
	try {
		await pool.query('BEGIN');

		for (let review of reviewsData) {
			const {
				user_id,
				apartment_id,
				review_text,
				date_of_review,
				star_rating,
			} = review;

			const queryString = `
			INSERT INTO reviews (user_id, apartment_id, review_text, date_of_review, star_rating) VALUES ($1, $2, $3, $4, $5);
			`;

			await client.query(queryString, [
				user_id,
				apartment_id,
				review_text,
				date_of_review,
				star_rating,
			]);

			await client.query('COMMIT');

			console.log(`Inserted review ${user_id}`);
		}
		process.exit(0);
	} catch (err) {
		await client.query('ROLLBACK');
		console.error(err);
		process.exit(1);
	} finally {
		client.release();
	}
}

async function main() {
	await seedUsers();
	await seedApartments();
	await seedReviews();
}

main();
