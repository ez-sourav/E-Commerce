import { addItemToCart,getUserCart,removeCartItem,updateCartQuantity} from "../services/cart.service.js";

export const addToCart = async (req, res) => {

    try {

        const result = await addItemToCart(
            req.user._id,
            req.body
        );

        return res.status(result.status).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const getCart = async (req, res) => {

    try {

        const result = await getUserCart(
            req.user._id
        );

        return res.status(result.status).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const removeFromCart = async (req, res) => {

    try {

        const result = await removeCartItem(
            req.user._id,
            req.params.productId,
            req.body.attributes
        );

        return res.status(result.status).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateCart = async (req, res) => {

    try {

        const result = await updateCartQuantity(
            req.user._id,
            req.body
        );

        return res.status(result.status).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};