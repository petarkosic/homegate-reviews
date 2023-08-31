import { Router } from 'express';
import { leaveReview } from '../controllers/reviewsController';

const router = Router();

router.post('/', leaveReview);

export default router;
