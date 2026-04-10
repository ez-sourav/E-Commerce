import express from 'express';
import {protect} from '../middlewares/auth.middleware.js'
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';
const router = express.Router();

router.post('/',protect,addToCart);

router.get('/',protect,getCart);

router.delete('/:productId',protect,removeFromCart);

export default router;