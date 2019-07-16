import express from 'express';

import tripController from '../controllers/trips';
const router = express.Router();

router.post(
  '/trips',
  passport.authenticate('jwt', { session: false }),
  tripController.createTrip,
);

router.get(
  '/trips',
  passport.authenticate('jwt', { session: false }),
  tripController.getAllTrips,
);

export default router;
