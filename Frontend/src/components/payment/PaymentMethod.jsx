import {
    Banknote,
    CreditCard,
    Smartphone,
    CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CardPaymentForm from "./CardPaymentForm";
const PaymentMethod = ({
    paymentMethod,
    setPaymentMethod,
}) => {
    const paymentMethods = [
        {
            id: "COD",
            label: "Cash on Delivery",
            description: "Pay when your order is delivered.",
            icon: Banknote,
            disabled: false,
        },
        {
            id: "CARD",
            label: "Credit / Debit Card",
            description: "Secure online payment (Demo).",
            icon: CreditCard,
            disabled: false,
        },
        {
            id: "UPI",
            label: "UPI",
            description: "Google Pay, PhonePe, Paytm and more.",
            icon: Smartphone,
            disabled: true,
        },
    ];

    const selectedPayment = paymentMethods.find(
        (method) => method.id === paymentMethod
    );

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4 }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 }
        }
    };

    const iconVariants = {
        hover: {
            scale: 1.08,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5"
            >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Payment Method
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Choose how you'd like to pay.
                </p>
            </motion.div>

            {/* Body */}
            <div className="flex flex-col lg:flex-row">

                {/* Left Side - Payment Options */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full lg:w-[320px] lg:border-r border-gray-200"
                >
                    {paymentMethods.map((method, index) => {
                        const Icon = method.icon;
                        const isSelected = paymentMethod === method.id;

                        return (
                            <motion.label
                                key={method.id}
                                htmlFor={method.id}
                                variants={itemVariants}
                                custom={index}
                                whileHover={!method.disabled ? {
                                    backgroundColor: isSelected ? "rgba(10, 61, 145, 0.05)" : "rgba(0,0,0,0.02)",
                                    x: 4
                                } : {}}
                                whileTap={!method.disabled ? { scale: 0.99 } : {}}
                                className={`flex items-start gap-3 sm:gap-4 border-b border-gray-100 p-4 sm:p-5 transition ${method.disabled
                                        ? "cursor-not-allowed opacity-60"
                                        : `cursor-pointer ${isSelected
                                            ? "bg-[#0A3D91]/5"
                                            : "hover:bg-gray-50"
                                        }`
                                    }`}
                            >
                                <input
                                    id={method.id}
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.id}
                                    checked={isSelected}
                                    disabled={method.disabled}
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 h-4 w-4 accent-[#0A3D91] shrink-0"
                                />

                                <motion.div
                                    whileHover={!method.disabled ? "hover" : {}}
                                    variants={iconVariants}
                                >
                                    <Icon
                                        size={20}
                                        className="mt-0.5 text-[#0A3D91] shrink-0"
                                    />
                                </motion.div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                                            {method.label}
                                        </span>

                                        {method.disabled && (
                                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 whitespace-nowrap">
                                                Coming Soon
                                            </span>
                                        )}

                                        {isSelected && !method.disabled && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 20
                                                }}
                                                className="ml-auto"
                                            >
                                                <CheckCircle2
                                                    size={18}
                                                    className="text-[#0A3D91] shrink-0"
                                                />
                                            </motion.div>
                                        )}
                                    </div>

                                    <p className="mt-1 text-xs sm:text-sm text-gray-500 wrap-break-word">
                                        {method.description}
                                    </p>
                                </div>
                            </motion.label>
                        );
                    })}
                </motion.div>

                {/* Right Side - Payment Details */}
                <div className="flex-1 p-4 sm:p-6 min-h-50">
                    <AnimatePresence mode="wait">
                        {selectedPayment?.id === "COD" && (
                            <motion.div
                                key="cod"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="mb-5 flex items-center gap-3"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: 0.2
                                        }}
                                    >
                                        <CheckCircle2
                                            size={28}
                                            className="text-green-600"
                                        />
                                    </motion.div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Cash on Delivery
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Pay after your order arrives.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="rounded-xl bg-gray-50 p-4 sm:p-5"
                                >
                                    <div className="space-y-3">
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.25 }}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-gray-600">
                                                Payment
                                            </span>
                                            <span className="font-medium">
                                                Cash
                                            </span>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-gray-600">
                                                Extra Charges
                                            </span>
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 20,
                                                    delay: 0.35
                                                }}
                                                className="font-medium text-green-600"
                                            >
                                                None
                                            </motion.span>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-gray-600">
                                                Delivery
                                            </span>
                                            <span className="font-medium">
                                                3–5 Business Days
                                            </span>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45 }}
                                    className="mt-5 rounded-xl border border-[#0A3D91]/15 bg-[#0A3D91]/5 p-4"
                                >
                                    <h4 className="font-medium text-[#0A3D91]">
                                        Good to Know
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Keep the exact amount ready when your
                                        order is delivered. Our delivery
                                        partner accepts cash only for Cash on
                                        Delivery orders.
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}

                        {selectedPayment?.id === "CARD" && (
                            <motion.div
                                key="stripe"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <CardPaymentForm />
                            </motion.div>
                        )}

                        {selectedPayment?.id === "UPI" && (
                            <motion.div
                                key="upi"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="rounded-xl bg-gray-50 p-6 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                >
                                    <Smartphone
                                        size={48}
                                        className="mx-auto text-gray-400"
                                    />
                                </motion.div>

                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="mt-4 text-lg font-semibold"
                                >
                                    UPI Payments
                                </motion.h3>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-2 text-sm text-gray-500"
                                >
                                    Google Pay, PhonePe, Paytm and other UPI
                                    apps will be available soon.
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </motion.div>
    );
};

export default PaymentMethod;