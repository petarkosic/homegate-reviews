import { Router } from 'express';
import { getApartment } from './../controllers/apartmentController';

const router = Router();

router.get('/:id', getApartment);

export default router;
