import express from 'express'
import { protect,isAdmin, } from '../middlewares/auth.middleware.js';
import { createProduct,getAllProducts, getProductById } from '../controllers/product.controller.js';

const router = express.Router();

router.post('/',protect,isAdmin,createProduct);

router.get('/',getAllProducts);

router.get('/:productId',getProductById);

export default router;