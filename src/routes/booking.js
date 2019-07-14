import express from 'express';
import passport from 'passport';

import bookingController from '../controllers/booking';
const router = express.Router();

router.post('/bookings', bookingController.bookASeatOnATrip);

router.get('/bookings', bookingController.viewAllBookings);

router.delete(
  '/bookings/:bookingid',
  passport.authenticate('jwt', { session: false }),
  bookingController.deleteBookingById,
);

export default router;
