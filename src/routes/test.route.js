import express from "express";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/user',protect,(req,res)=>{
    console.log(req.user);
    res.json({
        message:"User route accessed",
        user:req.user,
    })
}).get('/admin',protect,isAdmin,(req,res)=>{
    console.log(req.user);
    res.json({
        message:"Admin route accessed"
    })
})

export default router;

