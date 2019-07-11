import express from 'express';

import bookingController from '../controllers/booking';
const router = express.Router();

router.post('/bookings', bookingController.bookASeatOnATrip);

router.get('/bookings', bookingController.viewAllBookings);

export default router;
