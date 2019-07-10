import express from 'express';

import bookingController from '../controllers/booking';
const router = express.Router();

router.post('/bookings', bookingController.bookASeatOnATrip);

export default router;
