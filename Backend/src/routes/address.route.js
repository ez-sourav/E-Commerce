import express from "express";
import {
    createAddress,
    getUserAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "../controllers/address.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Address management APIs
 */

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - mobile
 *               - addressLine
 *               - city
 *               - state
 *               - postalCode
 *               - country
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               addressLine:
 *                 type: string
 *                 example: 123 Main Street
 *               city:
 *                 type: string
 *                 example: Mumbai
 *               state:
 *                 type: string
 *                 example: Maharashtra
 *               postalCode:
 *                 type: string
 *                 example: "400001"
 *               country:
 *                 type: string
 *                 example: India
 *     responses:
 *       201:
 *         description: Address added successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", protect, createAddress);

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: Get all addresses
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", protect, getUserAddresses);

/**
 * @swagger
 * /api/addresses/{id}:
 *   patch:
 *     summary: Update an address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe Updated
 *               mobile:
 *                 type: string
 *                 example: "9876543211"
 *               email:
 *                 type: string
 *                 example: john.updated@example.com
 *               addressLine:
 *                 type: string
 *                 example: 456 New Street
 *               city:
 *                 type: string
 *                 example: Delhi
 *               state:
 *                 type: string
 *                 example: Delhi
 *               postalCode:
 *                 type: string
 *                 example: "110001"
 *               country:
 *                 type: string
 *                 example: India
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 *       500:
 *         description: Server error
 */
router.patch("/:id", protect, updateAddress);

/**
 * @swagger
 * /api/addresses/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, deleteAddress);

/**
 * @swagger
 * /api/addresses/{id}/default:
 *   patch:
 *     summary: Set address as default
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Default address updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 *       500:
 *         description: Server error
 */
router.patch("/:id/default", protect, setDefaultAddress);

export default router;