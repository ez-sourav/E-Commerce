import mongoose from "mongoose";
import Product from "../model/product.model.js";
import cloudinary from "../utils/cloudinary.js";

// create product by admin only
export const createProduct = async (req, res) => {
    try {
        const {
            productName,
            price,
            description,
            category,
            productType,
            stock,
            variants
        } = req.body;

        if (!productName || price == null || !category || !productType) {
            return res.status(400).json({
                success: false,
                message: "Product name, price, category and productType are required."
            });
        }

        if (!["simple", "variant"].includes(productType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product type"
            });
        }

        if (productType === "simple" && stock == null) {
            return res.status(400).json({
                success: false,
                message: "Stock is required for simple product"
            });
        }

        if (productType === "variant") {
            if (!variants || variants.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Variants are required for variant product"
                });
            }

            const invalidVariant = variants.some(
                v => !v.attributes || Object.keys(v.attributes).length === 0 || v.stock == null
            );

            if (invalidVariant) {
                return res.status(400).json({
                    success: false,
                    message: "Each variant must have attributes and stock"
                });
            }
        }

        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required"
            });
        }

        let result;
        try {
            result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
                { folder: "products" }
            );
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed"
            });
        }

        
        if (!result || !result.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed"
            });
        }

       
        const product = await Product.create({
            productName,
            price,
            description,
            category,
            productType,
            stock: productType === "simple" ? stock : undefined,
            variants: productType === "variant" ? variants : [],
            image: {
                url: result.secure_url,
                public_id: result.public_id
            },
            createdBy: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Product Created Successfully.",
            product: {
                _id: product._id,
                productName: product.productName,
                image: product.image,
                price: product.price,
                productType: product.productType,
                description: product.description,
                category: product.category,
                ...(product.productType === "simple" && { stock: product.stock }),
                ...(product.productType === "variant" && { variants: product.variants })
            }
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        const formattedProducts = products.map(product => ({
            _id: product._id,
            productName: product.productName,
            image: product.image,
            price: product.price,
            description: product.description,
            category: product.category,
            productType: product.productType,

            ...(product.productType === "simple" && { stock: product.stock }),
            ...(product.productType === "variant" && { variants: product.variants })
        }));

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            count: formattedProducts.length,
            products: formattedProducts
        });
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

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const formattedProduct = {
            _id: product._id,
            productName: product.productName,
            image: product.image,
            price: product.price,
            description: product.description,
            category: product.category,
            productType: product.productType,

            ...(product.productType === "simple" && { stock: product.stock }),
            ...(product.productType === "variant" && { variants: product.variants })
        };

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            product: formattedProduct
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

        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            })
        }

        if (req.file) {
            // delete old image
            if (existingProduct.image?.public_id) {
                await cloudinary.uploader.destroy(existingProduct.image.public_id);
            }

            // upload new image
            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
                { folder: "products" }
            );

            req.body.image = {
                url: result.secure_url,
                public_id: result.public_id
            };
        }
        const { productType, stock, variants } = req.body;

        if (productType && !["simple", "variant"].includes(productType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product type"
            });
        }

        if (productType === "simple" && stock == null) {
            return res.status(400).json({
                success: false,
                message: "Stock required for simple product"
            });
        }

        if (productType === "variant" && variants) {
            const invalidVariant = variants.some(
                v => !v.attributes || Object.keys(v.attributes).length === 0 || v.stock == null
            );

            if (invalidVariant) {
                return res.status(400).json({
                    success: false,
                    message: "Each variant must have attributes and stock"
                });
            }
        }

        if (productType === "variant" && (!variants || variants.length === 0)) {
            return res.status(400).json({
                success: false,
                message: "Variants required for variant product"
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true }
        );

        const formattedProduct = {
            _id: updatedProduct._id,
            productName: updatedProduct.productName,
            image: updatedProduct.image,
            price: updatedProduct.price,
            description: updatedProduct.description,
            category: updatedProduct.category,
            productType: updatedProduct.productType,

            ...(updatedProduct.productType === "simple" && { stock: updatedProduct.stock }),
            ...(updatedProduct.productType === "variant" && { variants: updatedProduct.variants })
        };

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product: formattedProduct
        });

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

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        // delete image from cloudinary
        if (product.image?.public_id) {
            await cloudinary.uploader.destroy(product.image.public_id);
        }

        await Product.findByIdAndDelete(productId);

        const formattedProduct = {
            _id: product._id,
            productName: product.productName,
            image: product.image,
            price: product.price,
            description: product.description,
            category: product.category,
            productType: product.productType,

            ...(product.productType === "simple" && { stock: product.stock }),
            ...(product.productType === "variant" && { variants: product.variants })
        };

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
            product: formattedProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}