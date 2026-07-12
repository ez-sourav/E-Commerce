import express from 'express';
import {
  registerUserController,
  loginUserController,
  getMe,
  logoutUserController
} from '../controllers/auth.contoller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Example"
 *             email: "example@gmail.com"
 *             password: "11111"
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', registerUserController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "example@gmail.com"
 *             password: "11111"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', loginUserController);

/**
 * @swagger
 * /api/auth/getMe:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User fetched successfully"
 *               user:
 *                 name: "Example"
 *                 email: "example@gmail.com"
 *       401:
 *         description: Unauthorized (No token or invalid token)
 *       500:
 *         description: Server error
 */

router.get('/getMe', protect, getMe);


/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.get('/logout', logoutUserController);

export default router;