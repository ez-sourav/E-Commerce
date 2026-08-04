import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { getOrders } from "../Services/orderService";

import EmptyOrders from "../components/orders/EmptyOrders";
import OrderCard from "../components/orders/OrderCard";
import OrderCardSkeleton from "../components/orders/OrderCardSkeleton";

const listVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();

                setOrders(data.orders || []);
            } catch (error) {
                toast.error(
                    error.message ||
                    "Failed to load orders."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="bg-gray-50 py-6 sm:py-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">

                <div className="mb-6 sm:mb-8">

                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-black"
                    >
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </button>

                    <div className="flex items-center justify-between gap-4">

                        <div className="flex min-w-0 items-center gap-2.5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A3D91]/10 sm:h-11 sm:w-11">
                                <Package
                                    size={20}
                                    className="text-[#0A3D91]"
                                />
                            </div>

                            <h1 className="truncate text-xl font-bold text-gray-900 sm:text-3xl">
                                My Orders
                            </h1>
                        </div>

                        {!loading && orders.length > 0 && (
                            <span className="shrink-0 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-gray-500 shadow-sm ring-1 ring-gray-200">
                                {orders.length} Order
                                {orders.length > 1 ? "s" : ""}
                            </span>
                        )}

                    </div>

                </div>

                {/* Loading state */}
                {loading && (
                    <div className="space-y-4 sm:space-y-5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <OrderCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && orders.length === 0 && <EmptyOrders />}

                {/* Orders */}
                {!loading && orders.length > 0 && (
                    <motion.div
                        variants={listVariants}
                        initial="hidden"
                        animate="show"
                        className="space-y-4 sm:space-y-5"
                    >
                        {orders.map((order) => (
                            <OrderCard
                                key={order._id}
                                order={order}
                            />
                        ))}
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default MyOrders;