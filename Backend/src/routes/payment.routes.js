import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createPaymentIntent } from "../controllers/payment.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management APIs
 */

/**
 * @swagger
 * /api/payments/create-payment-intent:
 *   post:
 *     summary: Create Stripe Payment Intent
 *     tags: [Payments]
 *     description: Creates a Stripe Payment Intent and returns the client secret.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment Intent created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/create-payment-intent",
    protect,
    createPaymentIntent
);

export default router;