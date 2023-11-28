import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { createDbPool, pool } from './../db/db';
import { apartmentData, reviewsData, userData } from './data';

config();

async function createDb() {
	const client = await createDbPool.connect();

	try {
		await client.query('CREATE DATABASE homegate_reviews;');

		console.log('Database created successfully.');
	} catch (err) {
		console.log('Error creating database.');
		console.error(err);
		process.exit(1);
	} finally {
		client.release();

		await createTables();
	}
}

async function createTables() {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');

		await client.query(`
			CREATE TABLE users(
				user_id SERIAL,
				first_name VARCHAR(255) NOT NULL,
				last_name VARCHAR(255) NOT NULL,
				email VARCHAR(255) NOT NULL UNIQUE,
				password VARCHAR(255) NOT NULL,
				registered_at TIMESTAMP NOT NULL DEFAULT NOW(),
				PRIMARY KEY (user_id)
			);
		`);

		await client.query(`
			CREATE TABLE apartments(
				apartment_id BIGSERIAL,
				cost_of_rent DECIMAL,
				number_of_rooms INTEGER,
				living_space_sqm DECIMAL,
				address VARCHAR(255),
				availability VARCHAR(20),
				description TEXT,
				features_and_furnishings TEXT[],
				PRIMARY KEY (apartment_id)
			);
		`);

		await client.query(`
			CREATE TABLE reviews(
				review_id SERIAL,
				user_id SERIAL, 
				apartment_id BIGSERIAL,
				review_text TEXT NOT NULL,
				date_of_review TIMESTAMP NOT NULL DEFAULT NOW(),
				star_rating INTEGER NOT NULL CHECK (star_rating BETWEEN 1 AND 5),
				PRIMARY KEY (review_id),
				FOREIGN KEY (user_id) REFERENCES users (user_id),
				FOREIGN KEY (apartment_id) REFERENCES apartments (apartment_id)
			);
		`);

		await client.query('COMMIT');
		console.log('Tables created successfully.');
	} catch (err) {
		await client.query('ROLLBACK');
		console.log('Error creating tables.');
		console.error(err);
		process.exit(1);
	} finally {
		client.release();
	}
}

async function seedApartments() {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');

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
		await client.query('BEGIN');

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
		await client.query('BEGIN');

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
	await createDb();
	await seedUsers();
	await seedApartments();
	await seedReviews();
}

main();
