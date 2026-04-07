import jwt from 'jsonwebtoken'
import User from '../model/user.model.js';

export const protect = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Not authorized, no token.",
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({
            message:"Not Authorizred, token failed"
        })
    }
}

export const isAdmin = (req,res,next)=>{
    console.log(req.user.role);
    if(req.user && req.user.role == "admin"){
        next();
    }else{
        return res.status(403).json({
            message:"Admin access only"
        })
    }
}