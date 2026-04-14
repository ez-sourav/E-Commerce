import express from 'express'
import { protect,isAdmin, } from '../middlewares/auth.middleware.js';
import { createProduct,getAllProducts, getProductById,updateProduct, deleteProductById } from '../controllers/product.controller.js';
import { uploadProductImage } from '../middlewares/uploadImage.middleware.js';

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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - price
 *               - category
 *               - productType
 *               - image
 *             properties:
 *               productName:
 *                 type: string
 *                 example: Laptop
 *               price:
 *                 type: number
 *                 example: 50000
 *               description:
 *                 type: string
 *                 example: Dell Laptop
 *               category:
 *                 type: string
 *                 example: Electronics
 *               productType:
 *                 type: string
 *                 enum: [simple, variant]
 *                 example: simple
 *               stock:
 *                 type: number
 *                 example: 10
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     attributes:
 *                       type: object
 *                       additionalProperties:
 *                         type: string
 *                       example:
 *                         size: M
 *                         color: Black
 *                     stock:
 *                       type: number
 *                       example: 10
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post('/', protect, isAdmin, uploadProductImage, createProduct);


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
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               productType:
 *                 type: string
 *                 enum: [simple, variant]
 *               stock:
 *                 type: number
 *               variants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     attributes:
 *                       type: object
 *                       additionalProperties:
 *                         type: string
 *                     stock:
 *                       type: number
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Upload new image to replace old one
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.patch('/:productId',protect,isAdmin, uploadProductImage, updateProduct);

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