import express from "express"
import authRouters from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import testroutes from "./routes/test.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRouters);
app.use('/api/test',testroutes);

app.get('/',(req,res)=>{
    res.send("API is running...");
})

export default app;