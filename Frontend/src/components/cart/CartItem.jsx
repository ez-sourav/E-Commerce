import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { motion } from "framer-motion";
import { toast } from "sonner";
const CartItem = ({ item }) => {
    const { updateItemQuantity, removeItem, loading, removingItemKey } = useCart();
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    const product = item.product;
    const quantity = item.quantity;
    const isVariant = product.productType === "variant";
    const price = isVariant ? item.selectedVariant?.price || 0 : product.price;
    const attributes = item.selectedVariant?.attributes || {};
const currentItemKey = JSON.stringify({
    productId: product._id,
    attributes,
});

const isRemoving = removingItemKey === currentItemKey;
    const increaseQuantity = () => {
        updateItemQuantity(product._id, quantity + 1, attributes);
    };

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        updateItemQuantity(product._id, quantity - 1, attributes);
    };

    const handleRemove = async () => {
        try {
            await removeItem(product._id, attributes);

            toast.success("Removed from cart", {
                icon: <Trash2 className="h-5 w-5" />,
            });
        } catch (error) {
            toast.error("Failed to remove item.");
        }
    };

    useEffect(() => {
        if (!isZoomOpen) return;
        const handleEscape = (e) => {
            if (e.key === "Escape") setIsZoomOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isZoomOpen]);


    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-row gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:gap-5 sm:p-5"
            >

                <button
                    type="button"
                    onClick={() => setIsZoomOpen(true)}
                    aria-label="Zoom product image"
                    className="relative group w-20 shrink-0 cursor-zoom-in sm:w-28 md:w-32"
                >
                    <img
                        src={product.image?.url || "/placeholder-image.jpg"}
                        alt={product.productName}
                        className="aspect-square w-full rounded-lg border border-gray-100 object-cover transition group-hover:opacity-90 group-hover:scale-[1.02]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 rounded-lg transition group-hover:bg-black/10">
                    </span>
                </button>

                <div className="flex flex-1 flex-col justify-between gap-3 sm:gap-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <Link
                                to={`/product/${product._id}`}
                                state={{ selectedAttributes: attributes, quantity }}
                                className="group"
                            >
                                <h2 className="text-sm font-semibold text-gray-900 transition group-hover:text-[#0A3D91] sm:text-base md:text-lg line-clamp-2">
                                    {product.productName}
                                </h2>
                                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                                    {product.category}
                                </p>
                                {product.description && (
                                    <p className="mt-1 hidden text-xs text-gray-500 line-clamp-2 sm:block sm:text-sm">
                                        {product.description}
                                    </p>
                                )}
                            </Link>


                            {isVariant && Object.keys(attributes).length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3">
                                    {Object.entries(attributes).map(([key, value]) => (
                                        <span
                                            key={key}
                                            className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700 capitalize"
                                        >
                                            {key}: {value}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleRemove}
                           disabled={isRemoving}
                            aria-label="Remove item"
                            className="shrink-0 self-start rounded-md p-1.5 text-red-500 transition hover:bg-red-50 hover:text-red-600 hover:cursor-pointer disabled:opacity-50 disabled:hover:bg-transparent"
                        >
                            {isRemoving  ? (
                                <Loader2
                                    size={18}
                                    className="animate-spin sm:h-5 sm:w-5"
                                />
                            ) : (
                                <Trash2
                                    size={18}
                                    className="sm:h-5 sm:w-5"
                                />
                            )}
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 sm:gap-3 sm:pt-4">
                        <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                            <button
                                onClick={decreaseQuantity}
                                disabled={loading || quantity <= 1}
                                aria-label="Decrease quantity"
                                className="p-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:hover:bg-transparent sm:p-2.5"
                            >
                                <Minus size={16} className="sm:h-4.5 sm:w-4.5" />
                            </button>
                            <span className="min-w-8 px-2 text-center text-sm font-medium text-gray-900 sm:min-w-10 sm:px-3 sm:text-base">
                                {quantity}
                            </span>
                            <button
                                onClick={increaseQuantity}
                                disabled={loading}
                                aria-label="Increase quantity"
                                className="p-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:hover:bg-transparent sm:p-2.5"
                            >
                                <Plus size={16} className="sm:h-4.5 sm:w-4.5" />
                            </button>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-gray-500 sm:text-sm">
                                ₹{price.toFixed(2)} each
                            </p>
                            <p className="text-sm font-semibold text-gray-900 sm:text-base md:text-lg">
                                ₹{(price * quantity).toFixed(2)}
                            </p>
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* Image Zoom Modal */}
            {isZoomOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setIsZoomOpen(false)}
                >
                    <button
                        onClick={() => setIsZoomOpen(false)}
                        aria-label="Close zoomed image"
                        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 hover:scale-110 sm:right-6 sm:top-6 sm:p-3"
                    >
                        <X size={24} className="sm:h-7 sm:w-7" />
                    </button>

                    <img
                        src={product.image?.url || "/placeholder-image.jpg"}
                        alt={product.productName}
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain shadow-2xl sm:max-h-[85vh] sm:max-w-[80vw]"
                    />
                </div>
            )}
        </>
    );
};

export default CartItem;