import { PackageSearch, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmptyOrders = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex min-h-[50vh] items-center justify-center px-4 py-10"
        >
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">

                {/* Icon */}
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#0A3D91]/10"
                >
                    <PackageSearch
                        size={44}
                        className="text-[#0A3D91]"
                    />
                </motion.div>

                {/* Title */}
                <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    No Orders Yet
                </h2>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                    You haven't placed any orders yet.
                    <br />
                    Explore our latest collection and place your first order.
                </p>

                {/* CTA */}
                <Link
                    to="/shop"
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A3D91] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[#083170] active:scale-[0.98]"
                >
                    <ShoppingBag size={18} />
                    Start Shopping
                </Link>

            </div>
        </motion.div>
    );
};

export default EmptyOrders;