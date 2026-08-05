import {
    CreditCard,
    Wallet,
    Banknote,
    ShieldCheck,
    Clock3,
    CheckCircle2,
    XCircle,
    Package,
    Truck,
} from "lucide-react";
import { motion } from "framer-motion";

const OrderPaymentInfo = ({
    paymentMethod,
    paymentStatus,
    orderStatus,
}) => {
    const paymentMethods = {
        COD: {
            label: "Cash on Delivery",
            icon: Banknote,
        },

        CARD: {
            label: "Credit / Debit Card",
            icon: CreditCard,
        },

        UPI: {
            label: "UPI",
            icon: Wallet,
        },
    };

    const paymentStatusConfig = {
        pending: {
            label: "Pending",
            icon: Clock3,
            className:
                "bg-yellow-100 text-yellow-700 border border-yellow-200",
        },
        paid: {
            label: "Paid",
            icon: CheckCircle2,
            className:
                "bg-green-100 text-green-700 border border-green-200",
        },
        failed: {
            label: "Failed",
            icon: XCircle,
            className:
                "bg-red-100 text-red-700 border border-red-200",
        },
    };

    const orderStatusConfig = {
        pending: {
            label: "Pending",
            icon: Clock3,
            className:
                "bg-yellow-100 text-yellow-700 border border-yellow-200",
        },
        confirmed: {
            label: "Confirmed",
            icon: Package,
            className:
                "bg-blue-100 text-blue-700 border border-blue-200",
        },
        delivered: {
            label: "Delivered",
            icon: Truck,
            className:
                "bg-green-100 text-green-700 border border-green-200",
        },
        cancelled: {
            label: "Cancelled",
            icon: XCircle,
            className:
                "bg-red-100 text-red-700 border border-red-200",
        },
    };

    const payment =
        paymentMethods[paymentMethod] ||
        paymentMethods.COD;

    const paymentBadge =
        paymentStatusConfig[paymentStatus] ||
        paymentStatusConfig.pending;

    const orderBadge =
        orderStatusConfig[orderStatus] ||
        orderStatusConfig.pending;

    const PaymentIcon = payment.icon;
    const PaymentStatusIcon = paymentBadge.icon;
    const OrderStatusIcon = orderBadge.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
        >
            {/* Header */}
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A3D91]/10 sm:h-11 sm:w-11">
                    <ShieldCheck
                        size={20}
                        className="text-[#0A3D91]"
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                        Payment Information
                    </h2>

                    <p className="text-xs text-gray-500 sm:text-sm">
                        Payment and order status
                    </p>
                </div>
            </div>

            <div className="space-y-4 sm:space-y-5">

                {/* Payment Method */}
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <PaymentIcon
                            size={20}
                            className="shrink-0 text-[#0A3D91]"
                        />

                        <div>
                            <p className="text-xs text-gray-500 sm:text-sm">
                                Payment Method
                            </p>

                            <p className="text-sm font-medium text-gray-900 sm:text-base">
                                {payment.label}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Payment Status */}
                <div className="flex items-center justify-between">

                    <span className="text-xs text-gray-500 sm:text-sm">
                        Payment Status
                    </span>

                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${paymentBadge.className}`}
                    >
                        <PaymentStatusIcon size={14} />
                        {paymentBadge.label}
                    </span>

                </div>

                {/* Order Status */}
                <div className="flex items-center justify-between">

                    <span className="text-xs text-gray-500 sm:text-sm">
                        Order Status
                    </span>

                    <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium sm:text-sm ${orderBadge.className}`}
                    >
                        <OrderStatusIcon size={14} />
                        {orderBadge.label}
                    </span>

                </div>

            </div>
        </motion.div>
    );
};

export default OrderPaymentInfo;