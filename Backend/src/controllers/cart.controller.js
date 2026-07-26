import { addItemToCart,getUserCart,removeCartItem,updateCartQuantity,getGuestCartDetailsService} from "../services/cart.service.js";

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

export const getGuestCartDetails = async (req, res, next) => {
    try {

        const { items } = req.body;

        if (!Array.isArray(items)) {
            return res.status(400).json({
                success: false,
                message: "Items array is required"
            });
        }

        const result = await getGuestCartDetailsService(items);

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Guest cart fetched successfully",
            cart: {
                items: result.items
            },
            totalPrice: result.totalPrice
        });

    } catch (error) {
        next(error);
    }
};