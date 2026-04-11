import express from "express"
import cookieParser from "cookie-parser";
import authRouters from './routes/auth.route.js'
import testRoutes from "./routes/test.route.js";
import productRouters from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import orderRoutes from './routes/order.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRouters);
app.use('/api/test',testRoutes);
app.use('/api/products',productRouters);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);

app.get('/',(req,res)=>{
    res.send("API is running...");
})

export default app;