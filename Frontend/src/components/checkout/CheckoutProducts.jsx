import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CheckoutProducts = ({ cartItems = [] }) => {
    const navigate = useNavigate();

    const formatPrice = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`, {
            state: {
                fromCheckout: true,
            },
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="mb-5 flex items-center justify-between sm:mb-6"
            >
                <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                    Products
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 sm:text-sm">
                    {cartItems.length} Item{cartItems.length !== 1 ? "s" : ""}
                </span>
            </motion.div>

            {cartItems.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="py-10 text-center sm:py-12"
                >
                    <ShoppingBag
                        size={40}
                        className="mx-auto text-gray-300"
                    />

                    <p className="mt-3 text-sm text-gray-500 sm:text-base">
                        Your cart is empty.
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    className="space-y-4 sm:space-y-5"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.08,
                                delayChildren: 0.2,
                            },
                        },
                    }}
                >
                    {cartItems.map((item) => {
                        const image = item.product?.image?.url;

                        const name = item.product?.productName;

                        const price =
                            item.selectedVariant?.price ??
                            item.product?.price ??
                            0;

                        return (
                            <motion.div
                                key={item._id}
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 12,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                    },
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                                className="flex gap-3 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 sm:gap-4 sm:pb-5"
                            >
                                {/* Product Image */}
                                <motion.div
                                    whileHover={{
                                        scale: 1.04,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 sm:h-24 sm:w-24"
                                >
                                    {image ? (
                                        <img
                                            src={image}
                                            alt={name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <ShoppingBag
                                                size={22}
                                                className="text-gray-400"
                                            />
                                        </div>
                                    )}
                                </motion.div>

                                {/* Product Info */}
                                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                                    <div>
                                        <h3 className="line-clamp-2 text-sm font-semibold sm:text-base">
                                            <span
                                                onClick={() => handleProductClick(item.product._id)}
                                                className="inline cursor-pointer text-gray-900 transition-colors duration-200 hover:text-[#0A3D91] "
                                            >
                                                {name}
                                            </span>
                                        </h3>

                                        {item.selectedVariant?.attributes && (
                                            <div className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-2 sm:gap-2">
                                                {Object.entries(
                                                    item.selectedVariant.attributes
                                                ).map(([key, value]) => (
                                                    <span
                                                        key={key}
                                                        className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 sm:py-1 sm:text-xs"
                                                    >
                                                        {key}: {value}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500 sm:text-sm">
                                            Qty: {item.quantity}
                                        </span>

                                        <motion.span
                                            key={`${item._id}-${item.quantity}`}
                                            initial={{ scale: 0.95 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 20,
                                            }}
                                            className="text-base font-semibold text-[#0A3D91] sm:text-lg"
                                        >
                                            {formatPrice(
                                                price * item.quantity
                                            )}
                                        </motion.span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </motion.div>
    );
};

export default CheckoutProducts;