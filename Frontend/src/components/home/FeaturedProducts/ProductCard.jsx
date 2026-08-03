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

                toast.success(
                    "Product removed from wishlist."
                );
            } else {
                await addToWishlist(product._id);

                toast.success(
                    "Product added to wishlist."
                );
            }
        } catch (error) {
            toast.error(
                error.message ||
                "Wishlist operation failed."
            );
        } finally {
            setWishlistLoading(false);
        }
    };

    return (
        <Link to={`/product/${product._id}`}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl">
                {/* Image */}
                <div className="relative flex h-36 items-end justify-center overflow-hidden bg-gray-50 xs:h-44 sm:h-52">
                    <img
                        src={product.image.url}
                        alt={product.productName}
                        loading="lazy"
                        className="max-h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105 sm:p-3"
                    />

                    {/* Wishlist */}
                    <button
                        onClick={handleWishlist}
                        disabled={wishlistLoading}
                        aria-label={
                            wishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }
                        className={`absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition active:scale-95 sm:right-3 sm:top-3 sm:h-9 sm:w-9 ${wishlisted
                                ? "text-red-500"
                                : "text-gray-600 hover:text-red-500"
                            } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                        {wishlistLoading ? (
                            <Loader2
                                size={16}
                                className="animate-spin text-[#0A3D91]"
                            />
                        ) : (
                            <>
                                <Heart
                                    size={14}
                                    className="sm:hidden"
                                    fill={
                                        wishlisted
                                            ? "currentColor"
                                            : "none"
                                    }
                                />

                                <Heart
                                    size={18}
                                    className="hidden sm:block"
                                    fill={
                                        wishlisted
                                            ? "currentColor"
                                            : "none"
                                    }
                                />
                            </>
                        )}
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-2.5 xs:p-3 sm:p-4">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0A3D91] xs:text-[10px] sm:text-[11px] sm:tracking-[0.18em]">
                        {product.category}
                    </span>

                    <h3 className="mt-1 line-clamp-2 min-h-[2.1rem] text-xs font-semibold leading-4 text-gray-900 transition-colors duration-300 group-hover:text-[#0A3D91] xs:text-sm sm:mt-2 sm:min-h-10.5 sm:text-base sm:leading-5">
                        {product.productName}
                    </h3>

                    <div className="mt-2 sm:mt-3">
                        <span className="text-sm font-bold text-gray-900 transition-colors group-hover:text-[#0A3D91] xs:text-base sm:text-xl">
                            ₹
                            {product.price.toLocaleString(
                                "en-IN"
                            )}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ProductCard;