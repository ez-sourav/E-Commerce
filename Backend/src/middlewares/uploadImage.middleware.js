import upload from "./upload.js";

export const uploadProductImage = (req,res,next)=>{
    upload.single("image")(req,res,function(err){
        if(err){
            if(err.code === "LIMIT_FILE_SIZE"){
                return res.status(400).json({
                    success:false,
                    message:"Image size must be less than 500KB"
                });
            }

            return res.status(400).json({
                success:false,
                message:err.message
            });
        }

        next();
    });
};
