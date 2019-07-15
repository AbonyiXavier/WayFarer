import express from 'express';
import passport from 'passport';

import tripController from '../controllers/trips';
const router = express.Router();

router.post('/trips', tripController.createTrip);

router.get('/trips', tripController.getAllTrips);

router.patch(
  '/trips/:tripid',
  passport.authenticate('jwt', { session: false }),
  tripController.cancelTrip,
);

export default router;
