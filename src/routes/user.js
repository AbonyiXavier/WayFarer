import express from 'express';
import userController from '../controllers/user';
const router = express.Router();

router.post('/signUp', userController.signUp);

router.post('/signIn', userController.signIn);

export default router;
