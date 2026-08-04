import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";

import useWishlist from "../../hooks/useWishlist";
import formatPrice from "../../utils/formatPrice";

const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2, ease: "easeIn" },
    },
};

const WishlistCard = ({ item }) => {
    const product = item.product;

    const { removeFromWishlist } = useWishlist();

    const [removeLoading, setRemoveLoading] = useState(false);

    if (!product) return null;

    const {
        _id,
        productName,
        image,
        category,
        price,
        stock,
        productType,
        variants = [],
    } = product;

    const imageUrl =
        image?.url || "https://placehold.co/600x750?text=No+Image";

    const totalStock =
        productType === "variant"
            ? variants.reduce(
                  (total, variant) => total + variant.stock,
                  0
              )
            : stock;

    const inStock = totalStock > 0;

    const handleRemove = async () => {
        if (removeLoading) return;

        try {
            setRemoveLoading(true);

            await removeFromWishlist(_id);

            toast.success("Product removed from wishlist.");
        } catch (error) {
            toast.error(
                error.message || "Failed to remove product."
            );
        } finally {
            setRemoveLoading(false);
        }
    };

    return (
        <motion.article
            layout
            variants={cardVariants}
            exit="exit"
            whileHover={{ y: -4 }}
            transition={{ layout: { duration: 0.25 } }}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Link to={`/product/${_id}`} className="block h-full w-full">
                    <img
                        src={imageUrl}
                        alt={productName}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {/* Stock Badge */}
                <span
                    className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[10px] font-medium shadow-sm backdrop-blur-sm ${
                        inStock
                            ? "bg-green-100/90 text-green-700"
                            : "bg-red-100/90 text-red-700"
                    }`}
                >
                    {inStock ? "In Stock" : "Out of Stock"}
                </span>

                {/* Remove Button */}
                <motion.button
                    onClick={handleRemove}
                    disabled={removeLoading}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Remove from wishlist"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm backdrop-blur-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {removeLoading ? (
                        <Loader2 size={15} className="animate-spin" />
                    ) : (
                        <Heart size={15} className="fill-current" />
                    )}
                </motion.button>
            </div>

            {/* Content */}
            <div className="space-y-2 p-3 sm:p-4">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0A3D91]">
                        {category}
                    </p>

                    <Link to={`/product/${_id}`}>
                        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-gray-900 transition hover:text-[#0A3D91] md:text-base">
                            {productName}
                        </h3>
                    </Link>
                </div>

                <p className="text-lg font-bold text-[#0A3D91] md:text-xl">
                    {formatPrice(price)}
                </p>

                <Link to={`/product/${_id}`}>
                    <motion.div
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#0A3D91] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#08306f]"
                    >
                        <Eye size={16} />
                        View Product
                    </motion.div>
                </Link>
            </div>
        </motion.article>
    );
};

export default WishlistCard;