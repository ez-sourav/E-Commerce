import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { Loader2 } from "lucide-react";

import useWishlist from "../../hooks/useWishlist";
import formatPrice from "../../utils/formatPrice";

const ProductCard = ({
    product,
    showWishlist = true,
}) => {
    if (!product) return null;

    const {
        _id,
        productName,
        description,
        category,
        price,
        image,
        productType,
        stock,
        variants = [],
    } = product;

    const {
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
    } = useWishlist();

    const [wishlistLoading, setWishlistLoading] =
        useState(false);

    const wishlisted = isWishlisted(_id);

    const imageUrl =
        image?.url ||
        "https://placehold.co/600x750?text=No+Image";

    const totalVariantStock =
        productType === "variant"
            ? variants.reduce(
                (total, item) => total + item.stock,
                0
            )
            : stock;

    const inStock = totalVariantStock > 0;

    const handleWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (wishlistLoading) return;

        try {
            setWishlistLoading(true);

            if (wishlisted) {
                await removeFromWishlist(_id);
                toast.success("Product removed from wishlist.");
            } else {
                await addToWishlist(_id);
                toast.success("Product added to wishlist.");
            }
        } catch (error) {
            toast.error(error.message || "Wishlist operation failed.");
        } finally {
            setWishlistLoading(false);
        }
    };

    return (
        <motion.article
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xs transition-all hover:shadow-md sm:rounded-2xl"
        >
            <Link
                to={`/product/${_id}`}
                className="flex h-full flex-col"
            >
                {/* Product Image Window */}
                <div className="relative overflow-hidden bg-gray-50/60">
                    <div className="aspect-4/5 overflow-hidden">
                        <motion.img
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                            src={imageUrl}
                            alt={productName}
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Wishlist Button Panel */}
                    {showWishlist && (
                        <button
                            onClick={handleWishlist}
                            disabled={wishlistLoading}
                            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                            className={`absolute right-1.5 top-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-xs border border-gray-100/50 transition-all active:scale-95 xs:right-2 xs:top-2 xs:h-8 xs:w-8 sm:right-4 sm:top-4 sm:h-9 sm:w-9 ${
                                wishlisted ? "text-red-500" : "text-gray-600 hover:text-red-500"
                            } disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                            {wishlistLoading ? (
                                <Loader2 className="h-3.5 w-3.5 xs:h-4 xs:w-4 animate-spin text-[#0A3D91]" />
                            ) : (
                                <FiHeart
                                    className="h-3.5 w-3.5 xs:h-4.5 xs:w-4.5"
                                    fill={wishlisted ? "currentColor" : "none"}
                                />
                            )}
                        </button>
                    )}

                    {/* Options/Variant Badge overlay */}
                    {productType === "variant" && (
                        <span className="absolute left-1.5 top-1.5 max-w-[75%] truncate rounded-full bg-[#0A3D91] px-1.5 py-0.5 text-[8px] font-medium text-white xs:left-2 xs:top-2 xs:px-2 xs:text-[9px] sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
                            Multiple Options
                        </span>
                    )}
                </div>

                {/* Content Frame */}
                <div className="flex flex-1 flex-col p-2 xs:p-3 sm:gap-3 sm:p-5">
                    {/* Category Label */}
                    <p className="truncate text-[8px] font-semibold uppercase tracking-wider text-gray-400 xs:text-[9px] sm:text-xs">
                        {category}
                    </p>

                    {/* Product Name Title */}
                    <h3 className="mt-0.5 line-clamp-2 text-xs font-semibold leading-normal text-gray-900 transition-colors group-hover:text-[#0A3D91] xs:text-sm sm:text-base">
                        {productName}
                    </h3>

                    {/* Short Sub Description snippet */}
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-gray-400 xs:text-xs sm:text-sm">
                        {description}
                    </p>

                    {/* Price and Stock Layout Alignment container */}
                    <div className="mt-auto pt-2.5 flex items-center justify-between gap-1.5">
                        <p className="text-xs xs:text-sm font-bold text-[#0A3D91] sm:text-xl truncate max-w-[65%]">
                            {formatPrice(price)}
                        </p>

                        {inStock ? (
                            <span className="whitespace-nowrap rounded-full bg-green-50 px-1.5 py-0.5 text-[8px] xs:text-[9px] font-medium text-green-700 sm:px-2.5 sm:py-1 sm:text-xs">
                                In Stock
                            </span>
                        ) : (
                            <span className="whitespace-nowrap rounded-full bg-red-50 px-1.5 py-0.5 text-[8px] xs:text-[9px] font-medium text-red-600 sm:px-2.5 sm:py-1 sm:text-xs">
                                Out of Stock
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default ProductCard;
