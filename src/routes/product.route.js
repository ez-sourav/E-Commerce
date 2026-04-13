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
 *           examples:
 *             simpleProduct:
 *               summary: Simple Product (Electronics)
 *               value:
 *                 productName: "Laptop"
 *                 price: 50000
 *                 description: "Dell Laptop"
 *                 category: "Electronics"
 *                 productType: "simple"
 *                 stock: 10
 *             variantProduct:
 *               summary: Variant Product (Clothing)
 *               value:
 *                 productName: "T-Shirt"
 *                 price: 499
 *                 description: "Cotton T-Shirt"
 *                 category: "Clothing"
 *                 productType: "variant"
 *                 variants:
 *                   - attributes:
 *                       size: "M"
 *                       color: "Black"
 *                     stock: 10
 *                   - attributes:
 *                       size: "L"
 *                       color: "Black"
 *                     stock: 5
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *           examples:
 *             updateSimple:
 *               summary: Update simple product
 *               value:
 *                 price: 45000
 *                 stock: 8
 *             updateVariant:
 *               summary: Update variant product
 *               value:
 *                 variants:
 *                   - attributes:
 *                       size: "M"
 *                       color: "Red"
 *                     stock: 12
 *     responses:
 *       200:
 *         description: Product updated successfully
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