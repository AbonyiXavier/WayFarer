import express from 'express';
import userController from '../controllers/user';
const router = express.Router();

router.get('/test', userController.test);

router.post('/signUp', userController.signUp);

router.post('/signIn', userController.signIn);

export default router;
