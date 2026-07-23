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

        let parsedVariants = variants;

        // Parse variants if sent as JSON string
        if (productType === "variant" && typeof variants === "string") {
            try {
                parsedVariants = JSON.parse(variants);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid variants format"
                });
            }
        }

        // Basic validation
        if (!productName || price == null || !category || !productType) {
            return res.status(400).json({
                success: false,
                message: "Product name, price, category and product type are required."
            });
        }

        if (!["simple", "variant"].includes(productType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product type."
            });
        }

        // Simple product validation
        if (productType === "simple") {
            if (stock == null) {
                return res.status(400).json({
                    success: false,
                    message: "Stock is required for simple product."
                });
            }

            if (Number(stock) < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Stock cannot be negative."
                });
            }
        }

        // Variant product validation
        if (productType === "variant") {
            if (
                !parsedVariants ||
                !Array.isArray(parsedVariants) ||
                parsedVariants.length === 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Variants are required for variant product."
                });
            }

            const invalidVariant = parsedVariants.some((variant) => {
                return (
                    !variant.attributes ||
                    Object.keys(variant.attributes).length === 0 ||
                    variant.price == null ||
                    Number(variant.price) < 0 ||
                    variant.stock == null ||
                    Number(variant.stock) < 0
                );
            });

            if (invalidVariant) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Each variant must have attributes, price and stock."
                });
            }

            // Convert values to proper numbers
            parsedVariants = parsedVariants.map((variant) => ({
                attributes: variant.attributes,
                price: Number(variant.price),
                stock: Number(variant.stock)
            }));
        }

        // Image validation
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required."
            });
        }

        // Upload image
        let result;

        try {
            result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString(
                    "base64"
                )}`,
                {
                    folder: "products"
                }
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed."
            });
        }

        if (!result?.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed."
            });
        }

        // Create product
        const product = await Product.create({
            productName,
            price: Number(price),
            description,
            category,
            productType,
            stock: productType === "simple" ? Number(stock) : 0,
            variants: productType === "variant" ? parsedVariants : [],
            image: {
                url: result.secure_url,
                public_id: result.public_id
            },
            createdBy: req.user._id
        });

        return res.status(201).json({
            success: true,
            message: "Product Created Successfully.",
            product: {
                _id: product._id,
                productName: product.productName,
                image: product.image,
                price: product.price,
                description: product.description,
                category: product.category,
                productType: product.productType,
                ...(product.productType === "simple" && {
                    stock: product.stock
                }),
                ...(product.productType === "variant" && {
                    variants: product.variants
                })
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
                message: "Invalid product ID"
            });
        }

        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        // Upload new image if provided
        if (req.file) {
            // Delete old image
            if (existingProduct.image?.public_id) {
                await cloudinary.uploader.destroy(existingProduct.image.public_id);
            }

            let result;

            try {
                result = await cloudinary.uploader.upload(
                    `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
                    {
                        folder: "products"
                    }
                );
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Image upload failed."
                });
            }

            if (!result?.secure_url) {
                return res.status(500).json({
                    success: false,
                    message: "Image upload failed."
                });
            }

            req.body.image = {
                url: result.secure_url,
                public_id: result.public_id
            };
        }

        let { productType, stock, variants } = req.body;

        // If productType is not sent, use existing product type
        productType = productType || existingProduct.productType;

        let parsedVariants = variants;

        // Parse variants if sent as JSON string
        if (productType === "variant" && typeof variants === "string") {
            try {
                parsedVariants = JSON.parse(variants);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid variants format"
                });
            }
        }

        // Validate product type
        if (!["simple", "variant"].includes(productType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product type."
            });
        }

        // Convert product price if present
        if (req.body.price != null) {
            req.body.price = Number(req.body.price);

            if (req.body.price < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Price cannot be negative."
                });
            }
        }

        // Simple Product Validation
        if (productType === "simple") {

            if (stock == null) {
                return res.status(400).json({
                    success: false,
                    message: "Stock is required for simple product."
                });
            }

            req.body.stock = Number(stock);

            if (req.body.stock < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Stock cannot be negative."
                });
            }

            // Remove variants if switching to simple
            req.body.variants = [];
        }

        // Variant Product Validation
        if (productType === "variant") {

            if (
                !parsedVariants ||
                !Array.isArray(parsedVariants) ||
                parsedVariants.length === 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Variants are required for variant product."
                });
            }

            const invalidVariant = parsedVariants.some((variant) => (
                !variant.attributes ||
                Object.keys(variant.attributes).length === 0 ||
                variant.price == null ||
                Number(variant.price) < 0 ||
                variant.stock == null ||
                Number(variant.stock) < 0
            ));

            if (invalidVariant) {
                return res.status(400).json({
                    success: false,
                    message: "Each variant must have attributes, price and stock."
                });
            }

            req.body.stock = 0;

            req.body.variants = parsedVariants.map((variant) => ({
                attributes: variant.attributes,
                price: Number(variant.price),
                stock: Number(variant.stock)
            }));
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        const formattedProduct = {
            _id: updatedProduct._id,
            productName: updatedProduct.productName,
            image: updatedProduct.image,
            price: updatedProduct.price,
            description: updatedProduct.description,
            category: updatedProduct.category,
            productType: updatedProduct.productType,

            ...(updatedProduct.productType === "simple" && {
                stock: updatedProduct.stock
            }),

            ...(updatedProduct.productType === "variant" && {
                variants: updatedProduct.variants
            })
        };

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product: formattedProduct
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