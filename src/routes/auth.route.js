import express from 'express';
import {
  registerUserController,
  loginUserController,
  logoutUserController
} from '../controllers/auth.contoller.js';

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