import express from 'express';

import tripController from '../controllers/trips';
const router = express.Router();

router.post('/trips', tripController.createTrip);

router.get('/trips', tripController.getAllTrips);

router.patch('/trips/:tripid', tripController.cancelTrip);

export default router;
