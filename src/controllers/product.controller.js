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
            product
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

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            meassge: "Products fetched successfully",
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