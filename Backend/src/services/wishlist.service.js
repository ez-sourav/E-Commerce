import Wishlist from "../model/wishlist.model.js";
import Product from "../model/product.model.js";

export const addToWishlistService = async (
    userId,
    productId
) => {

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found.");
    }

    // Find user's wishlist
    let wishlist = await Wishlist.findOne({
        user: userId,
    });

    // Create wishlist if it doesn't exist
    if (!wishlist) {
        wishlist = await Wishlist.create({
            user: userId,
            products: [],
        });
    }

    const alreadyExists = wishlist.products.some(
        (item) =>
            item.product.toString() === productId
    );

    if (alreadyExists) {
        throw new Error(
            "Product already exists in wishlist."
        );
    }
    // Add product
    wishlist.products.push({
        product: productId,
    });

    await wishlist.save();

    // Return populated wishlist
    return await Wishlist.findOne({
        user: userId,
    }).populate({
        path: "products.product",
        select:
            "productName price stock image category productType variants",
    });
};

export const getWishlistService = async (userId) => {
    const wishlist = await Wishlist.findOne({
        user: userId,
    }).populate({
        path: "products.product",
        select:
            "productName price stock image category productType variants",
    });

    return wishlist || {
        user: userId,
        products: [],
    };
};


export const removeFromWishlistService = async (
    userId,
    productId
) => {
    const wishlist = await Wishlist.findOne({
        user: userId,
    });

    if (!wishlist) {
        throw new Error("Wishlist not found.");
    }

    const productExists = wishlist.products.some(
        (item) => item.product.toString() === productId
    );

    if (!productExists) {
        throw new Error("Product not found in wishlist.");
    }

    await Wishlist.updateOne(
        { user: userId },
        {
            $pull: {
                products: {
                    product: productId,
                },
            },
        }
    );

    return await Wishlist.findOne({
        user: userId,
    }).populate({
        path: "products.product",
        select:
            "productName price stock image category productType variants",
    });
};