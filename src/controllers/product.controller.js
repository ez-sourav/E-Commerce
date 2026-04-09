import mongoose from "mongoose";
import Product from "../model/product.model.js";

// create product by admin only
export const createProduct = async (req, res) => {
    try {
        const { productName, price, description, category, stock } = req.body;

        if (!productName || price == null || !category) {
            return res.status(400).json({
                success: false,
                message: "Product name, price and category are required."
            })
        }
        const product = await Product.create({
            productName,
            price,
            description,
            category,
            stock: stock ?? 0,
            createdBy: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Product Created Successfully.",
            product: {
                _id: product._id,
                productName: product.productName,
                price: product.price,
                description: product.description,
                category: product.category,
                stock: product.stock
            }
        })
    } catch (error) {
        if (error.name == "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().select("-__v -createdBy -createdAt -updatedAt");
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            count: products.length,
            products
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get product by id
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await Product.findById(productId).select("-__v -createdBy -createdAt -updatedAt");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid productId"
            })
        }

        const product = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid productId"
            })
        }

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
            product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}