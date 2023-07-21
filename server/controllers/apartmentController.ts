import { Request, Response } from 'express';
import pool from './../db/db';

const getApartment = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const apartment = await pool.query(
			'SELECT * FROM apartments WHERE apartment_id = $1',
			[id]
		);
		res.json({
			message: 'success',
			data: apartment.rows[0],
		});
	} catch (err) {
		console.error(err);
		res.status(500).json('Server error');
	}
};

export { getApartment };
