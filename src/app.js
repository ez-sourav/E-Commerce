import express from "express"
import cookieParser from "cookie-parser";
import authRouters from './routes/auth.route.js'
import testroutes from "./routes/test.route.js";
import productrouters from './routes/product.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRouters);
app.use('/api/test',testroutes);
app.use('/api/product',productrouters);

app.get('/',(req,res)=>{
    res.send("API is running...");
})

export default app;