import express from "express";

import {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
} from "../controllers/wishlist.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management APIs
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 687e7f2b91e7c4d52b3d1234
 *     responses:
 *       200:
 *         description: Product added to wishlist
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, addToWishlist);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getWishlist);

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.delete(
    "/:productId",
    protect,
    removeFromWishlist
);

export default router;