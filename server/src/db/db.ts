import pg from 'pg';
import { config } from 'dotenv';
config();

const { Pool } = pg;

const createDbPool = new Pool({
	user: process.env.CREATE_DB_USER,
	password: String(process.env.CREATE_DB_PASSWORD),
	host: process.env.CREATE_DB_HOST,
	port: Number(process.env.CREATE_DB_PORT),
	database: process.env.CREATE_DB_DATABASE,
});

const pool = new Pool({
	user: process.env.DB_USER,
	password: String(process.env.DB_PASSWORD),
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_DATABASE,
});

export { createDbPool, pool };
