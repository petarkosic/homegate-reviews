import { Router } from 'express';
import { getApartment } from '../controllers/apartmentsController';

const router = Router();

router.get('/:id', getApartment);

export default router;
