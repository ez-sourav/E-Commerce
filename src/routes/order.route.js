import {protect} from '../middlewares/auth.middleware.js'
import { createOrder,getMyOrders } from '../controllers/order.controller.js'
import express from "express"

const router = express.Router();

router.post('/',protect,createOrder);
router.get('/',protect,getMyOrders);

export default router;