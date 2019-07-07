import express from 'express';
import tripController from '../controllers/trips';
const router = express.Router();

router.post('/trips', tripController.createTrip);

router.get('/trips', tripController.getAllTrips);

export default router;
