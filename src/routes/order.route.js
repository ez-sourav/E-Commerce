import {protect} from '../middlewares/auth.middleware.js'
import { createOrder,getMyOrders } from '../controllers/order.controller.js'
import express from "express"

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create order from cart
 *     tags: [Orders]
 *     description: Converts user's cart into an order, validates stock, reduces stock, and clears cart.
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Order placed successfully"
 *               order:
 *                 _id: "65abc123"
 *                 user: "64f123abc123"
 *                 items:
 *                   - product: "64f123abc123"
 *                     attributes:
 *                       size: "M"
 *                       color: "Black"
 *                     quantity: 2
 *                     price: 499
 *                 totalPrice: 998
 *                 status: "pending"
 */

router.post('/',protect,createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get my orders
 *     tags: [Orders]
 *     description: Fetch all orders of the logged-in user
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Orders fetched successfully"
 *               orders:
 *                 - _id: "65abc123"
 *                   items:
 *                     - product:
 *                         _id: "64f123abc123"
 *                         productName: "T-Shirt"
 *                         price: 499
 *                       attributes:
 *                         size: "M"
 *                         color: "Black"
 *                       quantity: 2
 *                       price: 499
 *                   totalPrice: 998
 *                   status: "pending"
 */

router.get('/',protect,getMyOrders);

export default router;