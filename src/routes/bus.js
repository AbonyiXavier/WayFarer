import express from 'express';
import passport from 'passport';
import busController from '../controllers/bus';

const router = express.Router();

router.post(
  '/registerBus',
  passport.authenticate('jwt', { session: false }),
  busController.registerBus,
);

export default router;
