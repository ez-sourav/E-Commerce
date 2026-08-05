import { useEffect, useState } from "react";
import {
    ArrowLeft,
    ShoppingBag,
} from "lucide-react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { getOrder } from "../services/orderService";

import OrderItems from "../components/orderDetails/OrderItems";
import OrderAddress from "../components/orderDetails/OrderAddress";
import OrderPaymentInfo from "../components/orderDetails/OrderPaymentInfo";
import OrderPriceSummary from "../components/orderDetails/OrderPriceSummary";
import OrderDetailsSkeleton from "../components/orderDetails/OrderDetailsSkeleton";

const OrderDetails = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getOrder(orderId);
                setOrder(data.order);
            } catch (error) {
                toast.error(
                    error.message || "Failed to load order."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <OrderDetailsSkeleton />;
    }

    if (!order) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow"
                >
                    <h2 className="text-2xl font-bold text-gray-900">
                        Order Not Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        This order doesn't exist.
                    </p>

                    <button
                        onClick={() => navigate("/orders")}
                        className="mt-6 w-full rounded-xl bg-[#0A3D91] px-6 py-3 font-medium text-white transition hover:bg-[#083170] active:scale-[0.98]"
                    >
                        Back to Orders
                    </button>
                </motion.div>
            </div>
        );
    }

    const orderDate = new Date(
        order.createdAt
    ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">

                {/* Header */}

                <div className="mb-6 sm:mb-8">

                    <button
                        onClick={() => navigate("/orders")}
                        className="mb-4 flex items-center gap-2 text-sm cursor-pointer text-gray-600 transition hover:text-[#0A3D91] sm:mb-5"
                    >
                        <ArrowLeft size={17} />
                        Back
                    </button>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
                    >

                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                            <div className="min-w-0">

                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                    Order Details
                                </h1>

                                <p className="mt-2 break-all text-sm text-gray-500 sm:text-base">
                                    Order ID:
                                    <span className="ml-2 font-medium text-gray-800">
                                        #{order._id.slice(-13).toUpperCase()}
                                    </span>
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Placed on {orderDate}
                                </p>

                            </div>

                            <Link
                                to="/shop"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0A3D91] px-5 py-3 font-medium text-white transition-all duration-200 hover:bg-[#083170] active:scale-[0.98]"
                            >
                                <ShoppingBag size={18} />
                                Continue Shopping
                            </Link>

                        </div>

                    </motion.div>

                </div>

                {/* Content */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* Left */}

                    <div className="space-y-6 lg:col-span-2">

                        <OrderItems
                            items={order.items}
                        />

                        <OrderAddress
                            address={order.shippingAddress}
                        />

                    </div>

                    {/* Right */}

                    <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">

                        <OrderPaymentInfo
                            paymentMethod={order.paymentMethod}
                            paymentStatus={order.paymentStatus}
                            orderStatus={order.orderStatus}
                        />

                        <OrderPriceSummary
                            subtotal={order.subtotal}
                            shippingCharge={order.shippingCharge}
                            totalPrice={order.totalPrice}
                        />

                    </div>

                </div>

            </div>
        </div>
    );
};

export default OrderDetails;