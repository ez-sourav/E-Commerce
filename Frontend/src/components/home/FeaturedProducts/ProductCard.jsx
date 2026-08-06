import { useState } from "react";
import { Loader2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import useWishlist from "../../../hooks/useWishlist";

const ProductCard = ({ product }) => {
    const {
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
    } = useWishlist();

    const [wishlistLoading, setWishlistLoading] =
        useState(false);

    const wishlisted = isWishlisted(product._id);

    const handleWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (wishlistLoading) return;

        try {
            setWishlistLoading(true);

            if (wishlisted) {
                await removeFromWishlist(product._id);
                toast.success("Product removed from wishlist.");
            } else {
                await addToWishlist(product._id);
                toast.success("Product added to wishlist.");
            }
        } catch (error) {
            toast.error(error.message || "Wishlist operation failed.");
        } finally {
            setWishlistLoading(false);
        }
    };

    return (
        <Link to={`/product/${product._id}`} className="block h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-xs border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:rounded-2xl">

                <div className="relative flex h-32 xs:h-44 sm:h-52 items-center justify-center overflow-hidden bg-gray-50/50">
                    <img
                        src={product.image.url}
                        alt={product.productName}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain p-1.5 xs:p-2.5 transition-transform duration-500 group-hover:scale-105 sm:p-3"
                    />

                    {/* Wishlist Button Core */}
                    <button
                        onClick={handleWishlist}
                        disabled={wishlistLoading}
                        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        className={`absolute right-1.5 top-1.5 flex h-6 w-6 xs:h-8 xs:w-8 items-center justify-center rounded-full bg-white shadow-xs border border-gray-100/50 transition active:scale-95 sm:right-3 sm:top-3 sm:h-9 sm:w-9 ${
                            wishlisted ? "text-red-500" : "text-gray-600 hover:text-red-500"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                        {wishlistLoading ? (
                            <Loader2 className="h-3.5 w-3.5 xs:h-4 xs:w-4 animate-spin text-[#0A3D91]" />
                        ) : (
                            <Heart
                                className="h-3.5 w-3.5 xs:h-4.5 xs:w-4.5"
                                fill={wishlisted ? "currentColor" : "none"}
                            />
                        )}
                    </button>
                </div>

                {/* Content Frame */}
                <div className="flex flex-1 flex-col p-2 xs:p-3 sm:p-4">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.1em] xs:tracking-[0.14em] text-[#0A3D91] xs:text-[10px] sm:text-[11px] sm:tracking-[0.18em] truncate">
                        {product.category}
                    </span>

                    <h3 className="mt-1 line-clamp-2 text-xs font-semibold leading-normal text-gray-900 transition-colors duration-300 group-hover:text-[#0A3D91] xs:text-sm sm:mt-2 sm:text-base">
                        {product.productName}
                    </h3>

                    <div className="mt-auto pt-2">
                        <span className="text-xs xs:text-sm font-bold text-gray-900 transition-colors group-hover:text-[#0A3D91] sm:text-lg block truncate">
                            ₹{product.price.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ProductCard;
