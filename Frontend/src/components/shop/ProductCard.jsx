import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import formatPrice from "../../utils/formatPrice";

const ProductCard = ({
  product,
  showWishlist = true,
  showAddToCart = true,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

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
  const imageUrl =
    image?.url ||
    "https://placehold.co/600x750?text=No+Image";

  const totalVariantStock =
    productType === "variant"
      ? variants.reduce((total, item) => total + item.stock, 0)
      : stock;

  const inStock = totalVariantStock > 0;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsWishlisted((prev) => !prev);

    // TODO:
    // Integrate Wishlist API
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // TODO:
    // Integrate Cart API
    console.log(product);
  };

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl sm:rounded-2xl"
    >
      <Link to={`/products/${_id}`} className="flex h-full flex-col">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gray-100">
          <div className="aspect-[4/5] overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={imageUrl}
              alt={productName}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Wishlist */}
          {showWishlist && (
            <button
              onClick={handleWishlist}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className={`absolute right-1.5 top-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 xs:right-2 xs:top-2 xs:h-8 xs:w-8 sm:right-4 sm:top-4 sm:h-10 sm:w-10 ${isWishlisted
                ? "text-red-500"
                : "text-gray-600 hover:text-red-500"
                }`}
            >
              <FiHeart
                size={14}
                className="sm:hidden"
                fill={isWishlisted ? "currentColor" : "none"}
              />
              <FiHeart
                size={18}
                className="hidden sm:block"
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </button>
          )}

          {/* Variant Badge */}
          {productType === "variant" && (
            <span className="absolute left-1.5 top-1.5 max-w-[70%] truncate rounded-full bg-[#0A3D91] px-2 py-0.5 text-[9px] font-medium text-white xs:left-2 xs:top-2 sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
              Multiple Options
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-1.5 p-2.5 xs:gap-2 xs:p-3 sm:gap-4 sm:p-5">
          {/* Category */}
          <p className="truncate text-[9px] font-medium uppercase tracking-wider text-gray-500 xs:text-[10px] sm:text-xs">
            {category}
          </p>

          {/* Product Name */}
          <h3 className="line-clamp-2 min-h-[32px] text-xs font-semibold leading-tight text-gray-900 transition-colors group-hover:text-[#0A3D91] xs:min-h-[36px] xs:text-sm sm:min-h-[56px] sm:text-lg">
            {productName}
          </h3>

          {/* Product Description */}
          <p className="line-clamp-1 min-h-[14px] text-[11px] text-gray-500 xs:text-xs sm:min-h-[20px] sm:text-sm">
            {description}
          </p>

          {/* Price */}
          <div className="mt-auto flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-[#0A3D91] xs:text-base sm:text-2xl">
              {formatPrice(price)}
            </p>

            {inStock ? (
              <span className="whitespace-nowrap rounded-full bg-green-100 px-1.5 py-0.5 text-[9px] font-medium text-green-700 xs:px-2 xs:text-[10px] sm:px-3 sm:py-1 sm:text-xs">
                In Stock
              </span>
            ) : (
              <span className="whitespace-nowrap rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-medium text-red-600 xs:px-2 xs:text-[10px] sm:px-3 sm:py-1 sm:text-xs">
                Out of Stock
              </span>
            )}
          </div>

          {/* Add To Cart */}
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-all xs:gap-2 xs:py-2.5 xs:text-sm sm:rounded-xl sm:py-3 sm:text-base ${inStock
                ? "bg-[#0A3D91] text-white hover:bg-[#082f73]"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
            >
              <FiShoppingCart size={14} className="sm:hidden" />
              <FiShoppingCart size={18} className="hidden sm:block" />
              {inStock ? "Add to Cart" : "Unavailable"}
            </button>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default ProductCard;