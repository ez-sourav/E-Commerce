import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const listVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.06 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const OrderItems = ({ items = [] }) => {
    const formatPrice = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
        >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between sm:mb-6">
                <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                    Ordered Items
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 sm:text-sm">
                    {items.length} Item{items.length !== 1 ? "s" : ""}
                </span>
            </div>

            <motion.div
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="space-y-5 sm:space-y-6"
            >
                {items.map((item) => (
                    <motion.div
                        key={`${item.product}-${JSON.stringify(item.attributes)}`}
                        layout
                        variants={itemVariants}
                        className="flex gap-3 border-b border-gray-100 pb-5 last:border-none last:pb-0 sm:gap-4 sm:pb-6"
                    >
                        {/* Product Image */}
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:h-24 sm:w-24">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.productName}
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <ShoppingBag
                                        size={28}
                                        className="text-gray-300"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="flex min-w-0 flex-1 flex-col justify-between">

                            <div>

                                {/* Product Name */}
                                <Link
                                    to={`/product/${item.product}`}
                                    className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors hover:text-[#0A3D91] sm:text-base"
                                >
                                    {item.productName}
                                </Link>

                                {/* Variant Attributes */}
                                {item.attributes &&
                                    Object.keys(item.attributes).length > 0 && (
                                        <div className="mt-2.5 flex flex-wrap gap-2 sm:mt-3">
                                            {Object.entries(item.attributes).map(
                                                ([key, value]) => (
                                                    <span
                                                        key={key}
                                                        className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                                                    >
                                                        {key}: {value}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}

                            </div>

                            {/* Bottom */}
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-5 sm:gap-4">

                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 sm:gap-5 sm:text-sm">

                                    <span>
                                        Qty:
                                        <span className="ml-1 font-semibold text-gray-900">
                                            {item.quantity}
                                        </span>
                                    </span>

                                    <span>
                                        Price:
                                        <span className="ml-1 font-semibold text-gray-900">
                                            {formatPrice(item.price)}
                                        </span>
                                    </span>

                                </div>

                                <div className="text-right">

                                    <p className="text-xs text-gray-400">
                                        Total
                                    </p>

                                    <p className="text-base font-bold text-[#0A3D91] sm:text-lg">
                                        {formatPrice(
                                            item.price * item.quantity
                                        )}
                                    </p>

                                </div>

                            </div>

                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default OrderItems;