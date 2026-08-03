import {addToWishlistService,getWishlistService,removeFromWishlistService,} from "../services/wishlist.service.js";

export const addToWishlist = async (req, res) => {
    try {
        const wishlist = await addToWishlistService(
            req.user.id,
            req.body.productId
        );

        return res.status(200).json({
            success: true,
            message: "Product added to wishlist.",
            wishlist,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message:
                error.message ||
                "Failed to add product to wishlist.",
        });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await getWishlistService(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            wishlist,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Failed to fetch wishlist.",
        });
    }
};

export const removeFromWishlist = async (
    req,
    res
) => {
    try {
        const wishlist =
            await removeFromWishlistService(
                req.user.id,
                req.params.productId
            );

        return res.status(200).json({
            success: true,
            message:
                "Product removed from wishlist.",
            wishlist,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message:
                error.message ||
                "Failed to remove product from wishlist.",
        });
    }
};