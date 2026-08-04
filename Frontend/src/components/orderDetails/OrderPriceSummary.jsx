import { ReceiptIndianRupee, Truck } from "lucide-react";
import { motion } from "framer-motion";

const OrderPriceSummary = ({
    subtotal = 0,
    shippingCharge = 0,
    totalPrice = 0,
}) => {
    const formatPrice = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
        >
            {/* Header */}
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A3D91]/10 sm:h-11 sm:w-11">
                    <ReceiptIndianRupee
                        size={20}
                        className="text-[#0A3D91]"
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                        Price Details
                    </h2>

                    <p className="text-xs text-gray-500 sm:text-sm">
                        Order payment summary
                    </p>
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3.5 sm:space-y-4">

                <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-gray-600">
                        Subtotal
                    </span>

                    <span className="font-medium text-gray-900">
                        {formatPrice(subtotal)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm sm:text-base">

                    <div className="flex items-center gap-2 text-gray-600">
                        <Truck size={16} />

                        <span>Shipping</span>
                    </div>

                    <span
                        className={`font-medium ${
                            shippingCharge === 0
                                ? "text-green-600"
                                : "text-gray-900"
                        }`}
                    >
                        {shippingCharge === 0
                            ? "FREE"
                            : formatPrice(shippingCharge)}
                    </span>

                </div>

            </div>

            {/* Total */}
            <div className="mt-5 border-t border-gray-200 pt-4 sm:mt-6 sm:pt-5">

                <div className="flex items-center justify-between">

                    <span className="text-base font-semibold text-gray-900 sm:text-lg">
                        Total
                    </span>

                    <span className="text-xl font-bold text-[#0A3D91] sm:text-2xl">
                        {formatPrice(totalPrice)}
                    </span>

                </div>

            </div>
        </motion.div>
    );
};

export default OrderPriceSummary;