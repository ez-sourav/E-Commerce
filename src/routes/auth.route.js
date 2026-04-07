import express from 'express';
import {registerUserController,loginUserController,logoutUserController} from '../controllers/auth.contoller.js';
const router = express.Router();

router.post('/register',registerUserController);
router.post('/login',loginUserController);
router.get('/logout',logoutUserController);

export default router;