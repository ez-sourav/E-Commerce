import express from 'express';
import {protect} from '../middlewares/auth.middleware.js'
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management APIs
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productId: "64f123abc123"
 *             quantity: 2
 *     responses:
 *       201:
 *         description: Added to cart
*/

router.post('/',protect,addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart fetched
 */

router.get('/',protect,getCart);

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Removed from cart
 */

router.delete('/:productId',protect,removeFromCart);

export default router;