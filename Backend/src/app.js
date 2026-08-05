import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouters from './routes/auth.route.js'
import productRouters from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import orderRoutes from './routes/order.route.js';
import addressRoutes from "./routes/address.route.js";
import wishlistRoutes from "./routes/wishlist.route.js";
import paymentRoutes from "./routes/payment.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth',authRouters);
app.use('/api/products',productRouters);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/wishlist", wishlistRoutes);

app.get('/',(req,res)=>{
    res.send("API is running...");
})

export default app;