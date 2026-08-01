import { motion } from "framer-motion";
import { ShoppingBag, Truck, ShieldCheck, Gift } from "lucide-react";
import { Link } from "react-router-dom";

const CartSummary = ({ totalPrice, itemCount }) => {

    const FREE_SHIPPING_LIMIT = 500;
    const SHIPPING_CHARGE = 99;

    const deliveryCharge = totalPrice >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_CHARGE;
    const grandTotal = totalPrice + deliveryCharge;
    const remainingAmount = Math.max(FREE_SHIPPING_LIMIT - totalPrice, 0);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24"
        >
            <h2 className="mb-5 text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl">
                Order Summary
            </h2>

            <div className="mb-4 flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
                <span className="font-medium text-gray-900">₹{totalPrice}</span>
            </div>

            <div className="mb-4 flex justify-between text-sm sm:text-base">
                <span className="flex items-center gap-2 text-gray-600">
                    <Truck size={17} />
                    Shipping
                </span>
                <span className={`font-semibold ${deliveryCharge === 0 ? "text-green-600" : "text-gray-900"}`}>
                    {deliveryCharge === 0 ? "FREE" : `₹${SHIPPING_CHARGE}`}
                </span>
            </div>

            <hr className="my-5 border-gray-100" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mb-6 flex items-center justify-between"
            >
                <span className="text-base font-semibold text-gray-900 sm:text-lg">Total</span>
                <span className="text-xl font-bold text-[#0A3D91] sm:text-2xl">₹{grandTotal}</span>
            </motion.div>

            {deliveryCharge === 0 ? (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                    className="mb-6 rounded-lg border border-green-200 bg-green-50 p-3"
                >
                    <div className="flex items-center gap-2">
                        <Gift size={18} className="text-green-600" />
                        <p className="text-sm font-medium text-green-700">
                            You've unlocked FREE shipping!
                        </p>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                    className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-3"
                >
                    <div className="flex items-center gap-2">
                        <Truck size={18} className="text-yellow-600" />
                        <p className="text-sm text-yellow-700">
                            Add <strong>₹{remainingAmount}</strong> more for{" "}
                            <strong>FREE shipping</strong>
                        </p>
                    </div>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Link
                    to="/checkout"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A3D91] py-3 text-sm font-medium text-white transition hover:bg-[#08357d] active:scale-[0.98] sm:text-base"
                >
                    <ShoppingBag size={19} />
                    Proceed to Checkout
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Link
                    to="/shop"
                    className="mt-3 block w-full rounded-lg border border-gray-300 py-3 text-center text-sm font-medium transition bg-gray-100 hover:bg-gray-200 sm:text-base"
                >
                    Continue Shopping
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default CartSummary;