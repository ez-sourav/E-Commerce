import { Truck, Sparkles, Gift } from "lucide-react";
import { motion } from "framer-motion";
const CheckoutSummary = ({
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
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
    >
        <h2 className="mb-5 text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl">
           Order Summary
        </h2>

        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-4 flex items-center justify-between text-sm sm:text-base"
        >
            <span className="text-gray-600">
                Subtotal
            </span>

            <span className="font-medium text-gray-900">
                {formatPrice(subtotal)}
            </span>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
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

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mb-6 flex items-center justify-between"
        >
            <span className="text-base font-semibold text-gray-900 sm:text-lg">
                Total
            </span>

            <span className="text-xl font-bold text-[#0A3D91] sm:text-2xl">
                {formatPrice(total)}
            </span>
        </motion.div>

        {shippingCharge === 0 ? (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="rounded-lg border border-green-200 bg-green-50 p-3"
            >
                <div className="flex items-center gap-2">
                    <Gift
                        size={18}
                        className="text-green-600"
                    />

                    <p className="text-sm font-medium text-green-700">
                        You've unlocked{" "}
                        <strong>FREE shipping!</strong>
                    </p>
                </div>
            </motion.div>
        ) : (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="rounded-lg border border-yellow-200 bg-yellow-50 p-3"
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
                        <strong>FREE shipping</strong>
                    </p>
                </div>
            </motion.div>
        )}
    </motion.div>
);
};

export default CheckoutSummary;