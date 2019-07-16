import express from 'express';
import passport from 'passport';

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

router.patch(
  '/trips/:tripid',
  passport.authenticate('jwt', { session: false }),
  tripController.cancelTrip,
);

export default router;
