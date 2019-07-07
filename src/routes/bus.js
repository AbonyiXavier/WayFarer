import express from 'express';
import busController from '../controllers/bus';
const router = express.Router();

router.post('/registerBus', busController.registerBus);

export default router;
