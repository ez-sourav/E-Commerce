import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
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

import { toast } from "sonner";

import VariantSelector from "./VariantSelector";
import QuantitySelector from "./QuantitySelector";
import useCart from "../../hooks/useCart";
import compareAttributes from "../../utils/compareAttributes";

const trustRow = [
  { icon: Truck, label: "Free delivery ₹499+" },
  { icon: RotateCcw, label: "7-day returns" },
  { icon: ShieldCheck, label: "Secure payment" },
];

const ProductInfo = ({ product }) => {
  const location = useLocation();
  const cartQuantity = location.state?.quantity;
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    cart,
    addItem,
    removeItem,
    loading,
  } = useCart();

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

  const isInCart = useMemo(() => {

    return cart.some((item) => {

      const sameProduct =
        item.product._id === product._id;

      if (!sameProduct) return false;

      if (productType === "simple") {
        return true;
      }

      return compareAttributes(
        item.selectedVariant?.attributes || {},
        selectedVariant?.attributes || {}
      );

    });

  }, [
    cart,
    product,
    productType,
    selectedVariant,
  ]);

 /// Restore variant & quantity when coming from Cart
useEffect(() => {

  // -------- Simple Product --------
  if (productType === "simple") {

    if (cartQuantity) {
      setQuantity(cartQuantity);
    }

    return;
  }

  // -------- Variant Product --------

  if (variants.length === 0) return;

  const cartAttributes = location.state?.selectedAttributes;

  if (cartAttributes) {

    const matchedVariant = variants.find((variant) =>
      compareAttributes(
        variant.attributes,
        cartAttributes
      )
    );

    if (matchedVariant) {

      setSelectedVariant(matchedVariant);
      setSelectedAttributes(matchedVariant.attributes);

      if (cartQuantity) {
        setQuantity(cartQuantity);
      }

      return;
    }

  }

  const firstAvailable =
    variants.find((variant) => variant.stock > 0) ||
    variants[0];

  if (firstAvailable) {

    setSelectedVariant(firstAvailable);
    setSelectedAttributes(firstAvailable.attributes);

    if (cartQuantity) {
      setQuantity(cartQuantity);
    }

  }

}, [
  variants,
  productType,
  location.state,
  cartQuantity,
]);

  useEffect(() => {
    if (quantity > currentStock && currentStock > 0) {
      setQuantity(currentStock);
    }
  }, [currentStock, quantity]);

  if (!product) return null;

  const isOutOfStock = currentStock === 0;

  const handleCartAction = async () => {

    try {

      if (productType === "variant" && !selectedVariant) {
        toast.error("Please select a variant.");
        return;
      }

      if (isInCart) {

        await removeItem(
          product._id,
          productType === "variant"
            ? selectedVariant.attributes
            : {}
        );

        toast.success("Removed from cart");
        return;
      }

      await addItem({
        productId: product._id,
        quantity,
        attributes:
          productType === "variant"
            ? selectedVariant.attributes
            : {},
      });

      toast.success("Added to cart");

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    }

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
          onClick={handleCartAction}
          disabled={isOutOfStock || loading}
          className="flex items-center justify-center gap-2 rounded-full border-2 border-indigo-600 px-3 py-2.5 text-sm font-semibold text-[#0A3D91] transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400 sm:px-5 sm:py-3 sm:text-base"
        >
         {!isInCart && (
  <>
    <ShoppingCart size={16} className="sm:hidden" />
    <ShoppingCart size={18} className="hidden sm:block" />
  </>
)}
          {loading
            ? "Loading..."
            : isInCart
              ? "Remove from Cart"
              : "Add to Cart"}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock || loading}
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