import express from 'express';
import passport from 'passport';
import tripController from '../controllers/trips';
const router = express.Router();

router.post(
  '/trips',
  passport.authenticate('jwt', { session: false }),
  tripController.createTrip,
);

export default router;
