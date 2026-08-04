import {
    CheckCircle2,
    Package,
    ShoppingBag,
    CalendarDays,
    Truck,
    MapPin,
    Copy,
    Check,
    CreditCard,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrder } from "../Services/orderService";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const prefersReducedMotion = useReducedMotion();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAnimation, setShowAnimation] = useState(false);
    const [copied, setCopied] = useState(false);
    const [confettiPieces, setConfettiPieces] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrder(orderId);
                setOrder(data.order);
                // Trigger animation after order loads
                setTimeout(() => setShowAnimation(true), 300);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    // Generate confetti positions exactly once, so later re-renders
    // (e.g. clicking "copy") don't reroll random targets mid-animation.
    useEffect(() => {
        if (!showAnimation || prefersReducedMotion) return;

        const count = window.innerWidth < 640 ? 24 : 45;

        setConfettiPieces(
            Array.from({ length: count }).map((_, i) => ({
                id: i,
                hue: Math.round(Math.random() * 360),
                y: -80 - Math.random() * 120,
                x: (Math.random() - 0.5) * 180,
                rotate: Math.random() * 720,
                duration: 1.4 + Math.random(),
                delay: 0.4 + Math.random() * 0.4,
            }))
        );
    }, [showAnimation, prefersReducedMotion]);

    // Reset the "copied" badge after a moment
    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 1800);
        return () => clearTimeout(timer);
    }, [copied]);

    const handleCopyOrderId = () => {
        if (!order?._id) return;
        navigator.clipboard.writeText(order._id);
        setCopied(true);
    };

    if (loading) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
                <div className="flex flex-col items-center gap-3">
                    <motion.div
                        animate={prefersReducedMotion ? {} : { rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <Package size={36} className="text-gray-400 sm:h-10 sm:w-10" />
                    </motion.div>
                    <p className="text-sm text-gray-400">
                        Fetching your order...
                    </p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow sm:p-8"
                >
                    <Package
                        size={56}
                        className="mx-auto text-gray-400 sm:h-16 sm:w-16"
                    />
                    <h2 className="mt-5 text-xl font-bold sm:text-2xl">
                        Order Not Found
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        We couldn't find your recent order.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 w-full rounded-lg bg-[#0A3D91] px-6 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-[#083170] active:scale-[0.98] sm:w-auto sm:text-base"
                    >
                        Continue Shopping
                    </button>
                </motion.div>
            </div>
        );
    }

    const orderDate = new Date(order.createdAt).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

    // Container animation
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.08,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    const successIconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: prefersReducedMotion
                ? { duration: 0.3 }
                : {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2
                }
        }
    };

    // Detail rows for the order summary card
    const orderDetailRows = [
        {
            key: "date",
            label: "Order Date",
            icon: CalendarDays,
            value: orderDate,
        },
        {
            key: "payment",
            label: "Payment Method",
            icon: CreditCard,
            value: order.paymentMethod,
        },
        {
            key: "delivery",
            label: "Estimated Delivery",
            icon: Truck,
            value: "2 - 5 Business Days",
        },
    ];

    return (
        <div className="min-h-screen overflow-hidden bg-gray-50 px-4 py-6 sm:py-10">
            <AnimatePresence>
                {showAnimation && confettiPieces.length > 0 && (
                    <motion.div
                        className="pointer-events-none fixed inset-0 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {confettiPieces.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, scale: 0, x: -10, y: -10 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.3, 0],
                                    y: [-10, p.y, -10],
                                    x: [-10, p.x, -10],
                                    rotate: [0, p.rotate, 0],
                                }}
                                transition={{
                                    duration: p.duration,
                                    delay: p.delay,
                                    ease: "easeOut",
                                    times: [0, 0.5, 1],
                                }}
                                className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
                                style={{ backgroundColor: `hsl(${p.hue}, 70%, 50%)` }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="relative z-10 mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow sm:p-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Success Icon */}
                <motion.div
                    className="flex justify-center"
                    variants={successIconVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        animate={
                            prefersReducedMotion
                                ? {}
                                : { scale: [1, 1.15, 1] }
                        }
                        transition={{
                            duration: 0.6,
                            delay: 0.6,
                            repeat: 1,
                        }}
                        className="rounded-full bg-green-50 p-2"
                    >
                        <CheckCircle2
                            size={64}
                            className="text-green-500 sm:h-20 sm:w-20"
                        />
                    </motion.div>
                </motion.div>

                {/* Success Message */}
                <motion.h1
                    variants={itemVariants}
                    className="mt-5 text-center text-2xl font-bold leading-tight text-gray-900 sm:mt-6 sm:text-4xl"
                >
                    Order Placed Successfully! 🎉
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="mt-3 text-center text-sm text-gray-500 sm:text-base"
                >
                    Thank you for shopping with Trendify.
                </motion.p>

                <motion.p
                    variants={itemVariants}
                    className="mt-1.5 text-center text-xs text-gray-400 sm:mt-2 sm:text-sm"
                >
                    We've received your order and will begin processing it shortly.
                </motion.p>

                {/* Order Details */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 rounded-xl border bg-gray-50 p-4 sm:mt-10 sm:p-6"
                >
                    <h2 className="mb-4 text-base font-semibold text-gray-900 sm:mb-5 sm:text-xl">
                        Order Details
                    </h2>

                    <motion.div
                        className="space-y-3 sm:space-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Order ID with copy affordance */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <span className="text-sm text-gray-500 sm:text-base">
                                Order ID
                            </span>

                            <button
                                type="button"
                                onClick={handleCopyOrderId}
                                aria-label={
                                    copied
                                        ? "Order ID copied"
                                        : "Copy order ID"
                                }
                                className="flex items-center gap-1.5 self-start rounded-md text-left text-xs font-medium text-gray-900 transition hover:cursor-pointer hover:text-[#0A3D91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D91]/40 sm:self-auto sm:text-right sm:text-sm"
                                title="Copy order ID"
                            >
                                <span className="break-all">
                                    #{order._id.slice(-13).toUpperCase()}
                                </span>

                                {copied ? (
                                    <Check size={14} className="shrink-0 text-green-600" />
                                ) : (
                                    <Copy size={14} className="shrink-0 text-gray-400" />
                                )}
                            </button>

                            <span className="sr-only" role="status">
                                {copied ? "Order ID copied to clipboard" : ""}
                            </span>
                        </motion.div>

                        {orderDetailRows.map(({ key, label, icon: Icon, value }) => (
                            <motion.div
                                key={key}
                                variants={itemVariants}
                                className="flex items-center justify-between gap-3"
                            >
                                <span className="flex items-center gap-2 text-sm text-gray-500 sm:text-base">
                                    <Icon size={16} className="shrink-0" />
                                    {label}
                                </span>
                                <span className="text-right text-sm font-medium text-gray-900 sm:text-base">
                                    {value}
                                </span>
                            </motion.div>
                        ))}

                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-between border-t border-dashed pt-3 sm:pt-4"
                        >
                            <span className="text-base font-semibold text-gray-900 sm:text-lg">
                                Total Amount
                            </span>
                            <motion.span
                                animate={
                                    prefersReducedMotion
                                        ? {}
                                        : { scale: [1, 1.08, 1] }
                                }
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className="text-xl font-bold text-[#0A3D91] sm:text-2xl"
                            >
                                ₹{order.totalPrice}
                            </motion.span>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Delivery Address */}
                <motion.div
                    variants={itemVariants}
                    className="mt-5 rounded-xl border bg-white p-4 sm:mt-6 sm:p-6"
                >
                    <div className="mb-3 flex items-center gap-2 sm:mb-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                            <MapPin size={16} className="text-[#0A3D91]" />
                        </span>
                        <h2 className="text-base font-semibold text-gray-900 sm:text-xl">
                            Delivery Address
                        </h2>
                    </div>

                    <motion.div
                        className="space-y-1.5 text-gray-700 sm:space-y-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.p
                            variants={itemVariants}
                            className="text-base font-semibold text-gray-900 sm:text-lg"
                        >
                            {order.shippingAddress.fullName}
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            className="text-sm text-gray-500"
                        >
                            {order.shippingAddress.mobile}
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            className="text-sm leading-6 sm:text-base sm:leading-7"
                        >
                            {[
                                order.shippingAddress.houseNo,
                                order.shippingAddress.building,
                                order.shippingAddress.landmark,
                                order.shippingAddress.city,
                                order.shippingAddress.state,
                                order.shippingAddress.postalCode,
                                order.shippingAddress.country,
                            ]
                                .filter(Boolean)
                                .join(", ")}
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                    >
                        <Link
                            to="/shop"
                            className="flex items-center justify-center gap-2 rounded-lg bg-[#0A3D91] px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#083170] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D91]/40 sm:text-base"
                        >
                            <ShoppingBag size={18} />
                            Continue Shopping
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                    >
                        <Link
                            to="/orders"
                            className="flex items-center justify-center gap-2 rounded-lg border border-[#0A3D91] px-6 py-3 text-sm font-medium text-[#0A3D91] transition-colors duration-150 hover:bg-[#0A3D91]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D91]/40 sm:text-base"
                        >
                            <Package size={18} />
                            View My Orders
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default OrderConfirmation;