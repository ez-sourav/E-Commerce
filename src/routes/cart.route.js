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
 *           examples:
 *             simpleProduct:
 *               summary: Add simple product
 *               value:
 *                 productId: "64f123abc123"
 *                 quantity: 2
 *             variantProduct:
 *               summary: Add variant product (size, color)
 *               value:
 *                 productId: "64f123abc123"
 *                 quantity: 1
 *                 attributes:
 *                   size: "M"
 *                   color: "Black"
 *     responses:
 *       201:
 *         description: Added to cart
 */
router.post('/',protect,addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user cart with total price
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 */
router.get('/',protect,getCart);

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove product (or specific variant) from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             attributes:
 *               size: "M"
 *               color: "Black"
 *     responses:
 *       200:
 *         description: Product removed from cart
 */
router.delete('/:productId',protect,removeFromCart);

export default router;