import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
    createOrder,
    getMyOrders,
    getOrderById
} from "../controllers/order.controller.js";

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
 *     summary: Create a new order
 *     tags: [Orders]
 *     description: Creates an order from the authenticated user's cart, validates stock, reduces inventory, and clears the cart.
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Order placed successfully"
 *               order:
 *                 _id: "66abc123"
 *                 user: "65abc123"
 *                 items:
 *                   - product: "65product123"
 *                     productName: "T-Shirt"
 *                     image: "https://example.com/image.jpg"
 *                     attributes:
 *                       size: "M"
 *                       color: "Black"
 *                     quantity: 2
 *                     price: 599
 *                 shippingAddress:
 *                   fullName: "John Doe"
 *                   mobile: "9876543210"
 *                   email: "john@example.com"
 *                   addressLine: "Street 1"
 *                   city: "Kolkata"
 *                   state: "West Bengal"
 *                   postalCode: "700001"
 *                   country: "India"
 *                 paymentMethod: "COD"
 *                 paymentStatus: "pending"
 *                 orderStatus: "pending"
 *                 subtotal: 1198
 *                 shippingCharge: 0
 *                 totalPrice: 1198
 */
router.post("/", protect, createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders of the logged-in user
 *     tags: [Orders]
 *     description: Returns all orders placed by the authenticated user, sorted by newest first.
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
router.get("/", protect, getMyOrders);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get a single order
 *     tags: [Orders]
 *     description: Returns a specific order belonging to the authenticated user.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Order ID
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       404:
 *         description: Order not found
 */
router.get("/:orderId", protect, getOrderById);

export default router;