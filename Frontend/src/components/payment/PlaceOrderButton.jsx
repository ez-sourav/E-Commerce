import { useState, useEffect } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import useCart from "../../hooks/useCart";
import { placeOrder } from "../../Services/orderService";
import { createPaymentIntent } from "../../Services/paymentService";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
const PlaceOrderButton = ({
    selectedAddressId,
    paymentMethod,
    onSuccess,
}) => {
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const {
        cart,
        clearCart,
    } = useCart();

    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            toast.error("Please select a delivery address.");
            return;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        try {
            setLoading(true);


            // Stripe Card Payment
            if (paymentMethod === "CARD") {
                if (!stripe || !elements) {
                    toast.error("Stripe is not ready.");
                    return;
                }

                const paymentIntent = await createPaymentIntent(
                    selectedAddressId
                );

                if (!paymentIntent.success) {
                    throw new Error(
                        paymentIntent.message ||
                        "Failed to create payment."
                    );
                }

                const { error, paymentIntent: result } =
                    await stripe.confirmCardPayment(
                        paymentIntent.clientSecret,
                        {
                            payment_method: {
                                card: elements.getElement(CardElement),
                            },
                        }
                    );

                if (error) {
                    throw new Error(error.message);
                }

                if (result.status !== "succeeded") {
                    throw new Error("Payment failed.");
                }

                const response = await placeOrder({
                    addressId: selectedAddressId,
                    paymentMethod: "CARD",
                });

                await clearCart();

                if (onSuccess) {
                    onSuccess(response);
                }

                return;
            }

            // Cash On Delivery
            const response = await placeOrder({
                addressId: selectedAddressId,
                paymentMethod,
            });

            await clearCart();

            if (onSuccess) {
                onSuccess(response);
            }
        } catch (error) {
            toast.error(
                error?.message ||
                "Failed to place order. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Animation variants
    const buttonVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1 }
        },
        disabled: {
            scale: 1,
            opacity: 0.6
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            y: 10,
            transition: { duration: 0.2 }
        }
    };

    const errorVariants = {
        hidden: { opacity: 0, height: 0, marginTop: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            marginTop: 8,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            height: 0,
            marginTop: 0,
            transition: { duration: 0.2 }
        }
    };

    const securityVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, delay: 0.1 }
        }
    };

    const isDisabled = loading || cart.length === 0 || !selectedAddressId;

    // Mobile fixed bottom button
    if (isMobile) {
        return (
            <>
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.5
                    }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg px-4 py-3 sm:hidden"
                >
                    <div className="max-w-7xl mx-auto space-y-2">
                        {/* Error Messages - Mobile */}
                        <AnimatePresence mode="wait">
                            {!selectedAddressId && (
                                <motion.p
                                    key="address-error-mobile"
                                    variants={errorVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="text-center text-xs text-red-500"
                                >
                                    Please select a delivery address.
                                </motion.p>
                            )}

                            {cart.length === 0 && (
                                <motion.p
                                    key="cart-error-mobile"
                                    variants={errorVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="text-center text-xs text-red-500"
                                >
                                    Your cart is empty.
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Mobile Place Order Button */}
                        <motion.button
                            type="button"
                            onClick={handlePlaceOrder}
                            disabled={isDisabled}
                            variants={buttonVariants}
                            initial="initial"
                            whileHover={!isDisabled ? "hover" : "disabled"}
                            whileTap={!isDisabled ? "tap" : "disabled"}
                            animate={isDisabled ? "disabled" : "initial"}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A3D91] px-4 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#083170] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#0A3D91] focus:ring-offset-2 focus:ring-offset-white active:scale-[0.98]"
                        >
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <motion.span
                                        key="loading-mobile"
                                        variants={contentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        >
                                            <Loader2 size={18} />
                                        </motion.div>
                                        <span>
                                            {paymentMethod === "CARD"
                                                ? "Processing Payment..."
                                                : "Placing Order..."}
                                        </span>
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="place-mobile"
                                        variants={contentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex items-center justify-center gap-2 "
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                                delay: 0.1
                                            }}
                                        >
                                            <ShieldCheck size={18} />
                                        </motion.div>
                                        <span>
                                            {paymentMethod === "CARD"
                                                ? "Pay Securely"
                                                : "Place Order"}
                                        </span>
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </motion.div>
            </>
        );
    }

    // Desktop version
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
        >
            {/* Place Order Button */}
            <motion.button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isDisabled}
                variants={buttonVariants}
                initial="initial"
                whileHover={!isDisabled ? "hover" : "disabled"}
                whileTap={!isDisabled ? "tap" : "disabled"}
                animate={isDisabled ? "disabled" : "initial"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A3D91] px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-[#083170] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#0A3D91] focus:ring-offset-2 focus:ring-offset-white active:scale-[0.98]"
            >
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.span
                            key="loading"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex items-center justify-center gap-2"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                <Loader2 size={20} />
                            </motion.div>
                            <span>
                                {paymentMethod === "CARD"
                                    ? "Processing Payment..."
                                    : "Placing Order..."}
                            </span>
                        </motion.span>
                    ) : (
                        <motion.span
                            key="place"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex items-center justify-center gap-2 hover:cursor-pointer"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.1
                                }}
                            >
                                <ShieldCheck size={20} />
                            </motion.div>
                            <span>
                                {paymentMethod === "CARD"
                                    ? "Pay Securely"
                                    : "Place Order"}
                            </span>
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Error Messages */}
            <AnimatePresence mode="wait">
                {!selectedAddressId && (
                    <motion.p
                        key="address-error"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-center text-sm text-red-500"
                    >
                        Please select a delivery address.
                    </motion.p>
                )}

                {cart.length === 0 && (
                    <motion.p
                        key="cart-error"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-center text-sm text-red-500"
                    >
                        Your cart is empty.
                    </motion.p>
                )}
            </AnimatePresence>


        </motion.div>
    );
};

export default PlaceOrderButton;