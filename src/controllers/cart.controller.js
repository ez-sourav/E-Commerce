import Cart from "../model/cart.model.js";
import Product from "../model/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        const qty = Number(quantity) || 1;

        if (qty < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid quantity"
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            if (qty > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Exceeds available stock"
                });
            }

            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity: qty }],
            });

        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                const newQty = cart.items[itemIndex].quantity + qty;

                if (newQty > product.stock) {
                    return res.status(400).json({
                        success: false,
                        message: "Exceeds available stock"
                    });
                }

                cart.items[itemIndex].quantity = newQty;
            } else {
                if (qty > product.stock) {
                    return res.status(400).json({
                        success: false,
                        message: "Exceeds available stock"
                    });
                }

                cart.items.push({ product: productId, quantity: qty });
            }

            await cart.save();
        }

        await cart.populate("items.product", "productName price");

        return res.status(201).json({
            success: true,
            message: "Added to cart",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product", "productName price");

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cart: { items: [] },
                totalPrice: 0
            });
        }

        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.product.price * item.quantity;
        });

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            cart,
            totalPrice
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const initialLength = cart.items.length;

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        if (cart.items.length === initialLength) {
            return res.status(404).json({
                success: false,
                message: "Product not in cart"
            });
        }

        if (cart.items.length === 0) {
            await Cart.deleteOne({ _id: cart._id });
            return res.status(200).json({
                success: true,
                message: "Cart is now empty"
            });
        }

        await cart.save();

        await cart.populate("items.product", "productName price");

        return res.status(200).json({
            success: true,
            message: "Product removed successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};