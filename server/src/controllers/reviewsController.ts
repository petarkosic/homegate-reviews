import { Request, Response } from 'express';
import ReviewService from '../services/ReviewService';

type Error = {
	message: string;
};

const leaveReview = async (req: Request, res: Response) => {
	const client = await ReviewService.connect();

	try {
		let { user_id, apartment_id, review_text, star_rating } = req.body;

		if (!review_text || star_rating == null) {
			throw new Error('Please enter all fields.');
		}

		review_text = `"${review_text}"`;

		await ReviewService.leaveReview(
			client,
			user_id,
			apartment_id,
			review_text,
			star_rating
		);

		res.status(200).json({
			message: 'success',
		});
	} catch (err) {
		const error = err as Error;
		res.status(500).json({ message: error.message });
	} finally {
		client.release();
	}
};

export { leaveReview };
