import { ShoppingCart, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmptyCart = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 pt-12 sm:py-16"
        >
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg sm:max-w-lg sm:p-8">

                <div className="flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 sm:h-24 sm:w-24">
                        <ShoppingCart
                            size={40}
                            className="text-gray-500 sm:h-12 sm:w-12"
                        />
                    </div>
                </div>

                <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Your Cart is Empty
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-500 sm:text-base">
                    Looks like you haven't added any products to your cart yet. Browse our collection and find something you'll love.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                        to="/shop"
                        className="flex flex-1 items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-900 active:scale-[0.98] sm:text-base"
                    >
                        Continue Shopping
                    </Link>

                    <Link
                        to="/"
                        className="flex flex-1 items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 active:scale-[0.98] sm:text-base"
                    >
                        Back to Home
                    </Link>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="flex items-center justify-center gap-2 rounded-lg bg-green-50 px-3 py-3">
                            <Truck size={18} className="text-green-600" />
                            <span className="text-sm font-medium text-gray-700">
                                Free delivery above ₹499
                            </span>
                        </div>

                        <div className="flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-3">
                            <ShieldCheck size={18} className="text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">
                                Secure Payments
                            </span>
                        </div>

                        <div className="flex items-center justify-center gap-2 rounded-lg bg-purple-50 px-3 py-3">
                            <RotateCcw size={18} className="text-purple-600" />
                            <span className="text-sm font-medium text-gray-700">
                                Easy 7-Day Returns
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default EmptyCart;