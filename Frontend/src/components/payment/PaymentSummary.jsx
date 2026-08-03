import {
    ReceiptIndianRupee ,
    Truck,
    Gift,
    ShieldCheck, 
} from "lucide-react";
import { motion } from "framer-motion";

const PaymentSummary = ({
    subtotal = 0,
}) => {
    const FREE_SHIPPING_LIMIT = 500;
    const SHIPPING_CHARGE = 99;

    const shippingCharge =
        subtotal >= FREE_SHIPPING_LIMIT
            ? 0
            : SHIPPING_CHARGE;

    const total = subtotal + shippingCharge;

    const amountToFreeShipping = Math.max(
        FREE_SHIPPING_LIMIT - subtotal,
        0
    );

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
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            {/* Heading */}
            <div className="mb-6 flex items-center gap-2">
                <ReceiptIndianRupee 
                    size={22}
                    className="text-[#0A3D91]"
                />

                <h2 className="text-xl font-semibold text-gray-900">
                    Price Details
                </h2>
            </div>

            {/* Subtotal */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 flex items-center justify-between text-sm sm:text-base"
            >
                <span className="text-gray-600">
                    Subtotal
                </span>

                <span className="font-medium text-gray-900">
                    {formatPrice(subtotal)}
                </span>
            </motion.div>

            {/* Shipping */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-4 flex items-center justify-between text-sm sm:text-base"
            >
                <div className="flex items-center gap-2 text-gray-600">
                    <Truck size={17} />
                    <span>Shipping</span>
                </div>

                <span
                    className={`font-semibold ${
                        shippingCharge === 0
                            ? "text-green-600"
                            : "text-gray-900"
                    }`}
                >
                    {shippingCharge === 0
                        ? "FREE"
                        : formatPrice(shippingCharge)}
                </span>
            </motion.div>

            <hr className="my-5 border-gray-100" />

            {/* Total */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    delay: 0.2,
                    duration: 0.3,
                }}
                className="mb-6 flex items-center justify-between"
            >
                <span className="text-base font-bold sm:text-lg text-gray-900">
                    Total
                </span>

                <span className="text-xl font-bold text-[#0A3D91] sm:text-2xl">
                    {formatPrice(total)}
                </span>
            </motion.div>

            {/* Shipping Banner */}
            {shippingCharge === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.25,
                        duration: 0.3,
                    }}
                    className="mb-6 rounded-lg border border-green-200 bg-green-50 p-3"
                >
                    <div className="flex items-center gap-2">
                        <Gift
                            size={18}
                            className="text-green-600"
                        />

                        <p className="text-sm font-medium text-green-700">
                            You've unlocked{" "}
                            <strong>
                                FREE shipping!
                            </strong>
                        </p>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.25,
                        duration: 0.3,
                    }}
                    className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-3"
                >
                    <div className="flex items-center gap-2">
                        <Truck
                            size={18}
                            className="text-yellow-600"
                        />

                        <p className="text-sm text-yellow-700">
                            Add{" "}
                            <strong>
                                {formatPrice(
                                    amountToFreeShipping
                                )}
                            </strong>{" "}
                            more for{" "}
                            <strong>
                                FREE shipping
                            </strong>
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Secure Payment */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: 0.35,
                    duration: 0.3,
                }}
                className="mt-6 border-t border-gray-100 pt-5"
            >
                <div className="flex items-center gap-2">
                    <ShieldCheck
                        size={18}
                        className="text-green-600"
                    />

                    <h3 className="text-sm font-semibold text-gray-800">
                        Secure Payment
                    </h3>
                </div>

                <p className="mt-2 text-xs text-gray-500">
                    All online payments are encrypted and
                    processed securely. Cash on Delivery
                    is also available.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {[
                        "Visa",
                        "MasterCard",
                        "RuPay",
                        "UPI",
                        "Net Banking",
                    ].map((method) => (
                        <span
                            key={method}
                            className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700"
                        >
                            {method}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PaymentSummary;