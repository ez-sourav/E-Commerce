import { useEffect, useMemo, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Zap,
  CheckCircle,
  XCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import VariantSelector from "./VariantSelector";
import QuantitySelector from "./QuantitySelector";

const trustRow = [
  { icon: Truck, label: "Free delivery ₹499+" },
  { icon: RotateCcw, label: "7-day returns" },
  { icon: ShieldCheck, label: "Secure payment" },
];

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    productName,
    description,
    category,
    price,
    stock,
    productType,
    variants = [],
  } = product || {};

  // Price range for variant products
  const priceRange = useMemo(() => {
    if (productType !== "variant" || variants.length === 0) return null;

    const prices = variants.map((v) => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return min === max ? `₹${min}` : `₹${min} - ₹${max}`;
  }, [variants, productType]);

  const currentPrice =
    productType === "variant" ? selectedVariant?.price : price;

  const currentStock =
    productType === "variant" ? selectedVariant?.stock ?? 0 : stock;

  // Reset quantity whenever variant changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant]);

  useEffect(() => {
    if (quantity > currentStock && currentStock > 0) {
      setQuantity(currentStock);
    }
  }, [currentStock, quantity]);

  if (!product) return null;

  const isOutOfStock = currentStock === 0;

  const handleAddToCart = () => {
    console.log({ product, quantity, selectedVariant });
    // TODO: Cart API
  };

  const handleBuyNow = () => {
    console.log({ product, quantity, selectedVariant });
    // TODO: Checkout
  };

  const handleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    console.log(product);
    // TODO: Wishlist API
  };

  return (
    <div className="flex flex-col">
      {/* Category + wishlist */}
      <div className="flex items-start justify-between">
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
          {category}
        </span>

        <button
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-red-200 hover:text-red-500"
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-red-500 text-red-500" : ""}
          />
        </button>
      </div>

      <h1 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
        {productName}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="text-3xl font-bold text-[#0A3D91]">
          {productType === "variant"
            ? selectedVariant
              ? `₹${currentPrice}`
              : priceRange
            : `₹${price}`}
        </p>

        <div className="flex items-center gap-1.5">
          {currentStock > 0 ? (
            <>
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-600">
                In Stock ({currentStock})
              </span>
            </>
          ) : (
            <>
              <XCircle size={16} className="text-red-600" />
              <span className="text-sm font-medium text-red-600">
                Out of Stock
              </span>
            </>
          )}
        </div>
      </div>

      {productType === "variant" && !selectedVariant && (
        <p className="mt-1 text-sm text-gray-500">
          Select a variant to view stock.
        </p>
      )}

      {description && (
        <p className="mt-4 leading-6 text-gray-600">{description}</p>
      )}

      <div className="my-6 h-px bg-gray-100" />
      {productType === "variant" && (
        <div className="mb-6">
          <VariantSelector
            variants={variants}
            setSelectedVariant={setSelectedVariant}
            selectedAttributes={selectedAttributes}
            setSelectedAttributes={setSelectedAttributes}
          />
        </div>
      )}

      <div className="mb-8">
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          max={currentStock}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-indigo-600 px-3 py-2.5 text-sm font-semibold text-[#0A3D91] transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400 sm:px-5 sm:py-3 sm:text-base"
        >
          <ShoppingCart size={16} className="sm:hidden" />
          <ShoppingCart size={18} className="hidden sm:block" />
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-2 rounded-full bg-[#0A3D91] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-300 sm:px-5 sm:py-3 sm:text-base"
        >
          <Zap size={16} className="sm:hidden" />
          <Zap size={18} className="hidden sm:block" />
          Buy Now
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gray-100 pt-5">
        {trustRow.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <Icon size={17} className="text-[#0A3D91]" />
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductInfo;