import mongoose from "mongoose";

const productSchema =  new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    description:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    stock:{
        type:Number,
        default:0,
        min:0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const Product = mongoose.model('Product',productSchema);
export default Product;