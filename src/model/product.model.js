import mongoose from "mongoose";

const variantsSchema = new mongoose.Schema({
    attributes:{
        type:Map,
        of:String,
    },
    stock:{
        type:Number,
        required:true,
        min:0
    }
},{_id:false});

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
    productType:{
        type:String,
        enum:["simple","variant"],
        required:true
    },
    stock:{
        type:Number,
        default:0,
        min:0
    },

    variants:[variantsSchema],

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const Product = mongoose.model('Product',productSchema);
export default Product;