import { CalendarDays, ChevronRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import OrderStatusBadge from "./OrderStatusBadge";

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut" },
    },
};

const OrderCard = ({ order }) => {
    const firstItem = order.items[0];
    const extraItems = order.items.length - 1;

    const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const formatPrice = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);

    return (
        <motion.div
            layout
            variants={cardVariants}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6"
        >
            {/* Top */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Left */}
                <div className="flex min-w-0 gap-3 sm:gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:h-24 sm:w-24">
                        {firstItem?.image ? (
                            <img
                                src={firstItem.image}
                                alt={firstItem.productName}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <Package size={24} className="text-gray-300" />
                            </div>
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <h2 className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-lg">
                            {firstItem.productName}
                        </h2>

                        {extraItems > 0 && (
                            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                + {extraItems} more item
                                {extraItems > 1 ? "s" : ""}
                            </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4 sm:gap-3">
                            <OrderStatusBadge status={order.orderStatus} />

                            <div className="flex items-center gap-1 text-xs text-gray-500 sm:text-sm">
                                <CalendarDays size={14} />
                                {orderDate}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price */}
                <div className="flex shrink-0 items-center justify-between gap-2 sm:block sm:text-right">
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                        Total
                    </p>
                    <p className="text-lg font-bold text-[#0A3D91] sm:mt-1 sm:text-xl">
                        {formatPrice(order.totalPrice)}
                    </p>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
                <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                        Order ID
                    </p>
                    <p className="mt-1 truncate font-mono text-xs text-gray-700 sm:text-sm">
                        #{order._id.slice(-13).toUpperCase()}
                    </p>
                </div>

                <Link
                    to={`/orders/${order._id}`}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#0A3D91] px-5 py-2.5 text-sm font-medium text-[#0A3D91] transition-all duration-200 hover:bg-[#0A3D91] hover:text-white active:scale-[0.98]"
                >
                    View Details
                    <ChevronRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                </Link>
            </div>
        </motion.div>
    );
};

export default OrderCard;