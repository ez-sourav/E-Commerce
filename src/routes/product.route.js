import express from 'express'
import { protect,isAdmin, } from '../middlewares/auth.middleware.js';
import { createProduct,getAllProducts, getProductById,updateProduct, deleteProductById } from '../controllers/product.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description:  Product management APIs
 */


/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product (Admin only)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productName: "iPhone 15"
 *             price: 79999
 *             description: "Latest Apple phone"
 *             category: "Mobile"
 *             stock: 10
 *     responses:
 *       201:
 *         description: Product created
*/
router.post('/',protect,isAdmin,createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security: []
 *     responses:
 *       200:
 *         description: Products fetched
*/

router.get('/',getAllProducts);
/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched
*/
router.get('/:productId',getProductById);

/**
 * @swagger
 * /api/products/{productId}:
 *   patch:
 *     summary: Update product (Admin only)
 *     tags: [Products]
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
 *             price: 75000
 *             stock: 5
 *     responses:
 *       200:
 *         description: Product updated
*/
router.patch('/:productId',protect,isAdmin, updateProduct);

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete product (Admin only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */

router.delete('/:productId',protect,isAdmin, deleteProductById);





export default router;