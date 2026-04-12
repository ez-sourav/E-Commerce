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
 *     responses:
 *       201:
 *         description: Order placed successfully
*/

router.post('/',protect,createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get my orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Orders fetched
 */

router.get('/',protect,getMyOrders);

export default router;