import { Request, Response } from 'express';
import ApartmentService from '../services/ApartmentService';

type Error = {
	message: string;
};

const getApartment = async (req: Request, res: Response) => {
	const client = await ApartmentService.connect();

	try {
		const { id } = req.params;

		const apartment = await ApartmentService.getApartment(client, id);

		res.status(200).json({
			message: 'success',
			data: apartment || [],
		});
	} catch (err) {
		const error = err as Error;
		res.status(500).json({ message: error.message });
	} finally {
		client.release();
	}
};

export { getApartment };
