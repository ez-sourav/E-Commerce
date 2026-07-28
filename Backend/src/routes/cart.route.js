import express from 'express';
import {protect} from '../middlewares/auth.middleware.js'
import { addToCart, getCart, removeFromCart, updateCart,getGuestCartDetails} from '../controllers/cart.controller.js';
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

/**
 * @swagger
 * /api/cart:
 *   patch:
 *     summary: Update quantity of a cart item
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           examples:
 *             simpleProduct:
 *               summary: Update simple product quantity
 *               value:
 *                 productId: "64f123abc123"
 *                 quantity: 4
 *             variantProduct:
 *               summary: Update variant product quantity
 *               value:
 *                 productId: "64f123abc123"
 *                 quantity: 3
 *                 attributes:
 *                   size: "M"
 *                   color: "Black"
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Invalid quantity, invalid variant, or exceeds available stock
 *       404:
 *         description: Cart or product not found
 */
router.patch("/", protect, updateCart);

/**
 * @swagger
 * /api/cart/guest:
 *   post:
 *     summary: Get guest cart details
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             items:
 *               - productId: "64f123abc123"
 *                 quantity: 2
 *                 attributes:
 *                   size: "M"
 *                   color: "Black"
 *               - productId: "64f456abc456"
 *                 quantity: 1
 *     responses:
 *       200:
 *         description: Guest cart fetched successfully
 */
router.post("/guest", getGuestCartDetails);

export default router;