import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import useCart from "../hooks/useCart";

import PaymentMethod from "../components/payment/PaymentMethod";
import PaymentSummary from "../components/payment/PaymentSummary";
import PlaceOrderButton from "../components/payment/PlaceOrderButton";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { totalPrice, initialLoading } = useCart();

    const [paymentMethod, setPaymentMethod] =
        useState("COD");

    const selectedAddressId =
        location.state?.addressId;

    const fromCheckout =
        location.state?.fromCheckout;

    // Prevent opening Payment page directly
    useEffect(() => {
        if (!selectedAddressId || !fromCheckout) {
            navigate("/checkout", {
                replace: true,
            });
        }
    }, [
        selectedAddressId,
        fromCheckout,
        navigate,
    ]);

    if (!selectedAddressId) return null;

    return (
        <div className="min-h-screen bg-gray-50 pb-8">

            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{
                        opacity: 0,
                        x: -20,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.35,
                    }}
                    className="mb-8 flex flex-wrap items-center justify-between gap-4"
                >
                    <div >
                        <button
                            onClick={() => navigate("/checkout")}
                            className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black transition-colors"
                        >
                            <ArrowLeft size={18} />
                            <span>Back to Checkout</span>
                        </button>

                        <div className="mt-5">
                            <h1 className="text-3xl font-bold text-gray-900">
                                Payment
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Select your payment method to complete your purchase.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {initialLoading ? (

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.35,
                        }}
                        className="grid grid-cols-1 gap-6 lg:grid-cols-3 animate-pulse"
                    >

                        {/* Left */}
                        <div className="lg:col-span-2">

                            <div className="rounded-xl border border-gray-200 bg-white p-6">

                                <div className="h-7 w-56 rounded bg-gray-200" />

                                <div className="mt-8 space-y-5">

                                    {[1, 2, 3].map(
                                        (item) => (
                                            <div
                                                key={
                                                    item
                                                }
                                                className="rounded-xl border border-gray-100 p-5"
                                            >
                                                <div className="flex items-center gap-4">

                                                    <div className="h-6 w-6 rounded-full bg-gray-200" />

                                                    <div className="flex-1">

                                                        <div className="h-5 w-40 rounded bg-gray-200" />

                                                        <div className="mt-3 h-4 w-56 rounded bg-gray-100" />

                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Right */}
                        <div className="space-y-5">

                            <div className="rounded-xl border border-gray-200 bg-white p-6">

                                <div className="h-6 w-40 rounded bg-gray-200" />

                                <div className="mt-8 space-y-4">

                                    <div className="flex justify-between">
                                        <div className="h-4 w-28 rounded bg-gray-100" />
                                        <div className="h-4 w-20 rounded bg-gray-100" />
                                    </div>

                                    <div className="flex justify-between">
                                        <div className="h-4 w-24 rounded bg-gray-100" />
                                        <div className="h-4 w-16 rounded bg-gray-100" />
                                    </div>

                                    <div className="border-t border-gray-200 pt-5 flex justify-between">
                                        <div className="h-5 w-16 rounded bg-gray-200" />
                                        <div className="h-5 w-28 rounded bg-gray-200" />
                                    </div>

                                </div>

                                <div className="mt-6 h-16 rounded-lg bg-gray-100" />

                                <div className="mt-6 rounded-lg bg-gray-100 p-5">
                                    <div className="h-5 w-36 rounded bg-gray-200" />
                                    <div className="mt-3 h-4 w-full rounded bg-gray-200" />
                                    <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />
                                </div>

                            </div>

                            <div className="h-14 rounded-xl bg-gray-200" />

                        </div>

                    </motion.div>

                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.1,
                        }}
                        className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start"
                    >
                        {/* Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.15,
                                duration: 0.35,
                            }}
                            className="lg:col-span-2"
                        >
                            <PaymentMethod
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                            />
                        </motion.div>

                        {/* Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.2,
                                duration: 0.35,
                            }}
                            className="space-y-5 lg:sticky lg:top-6 lg:self-start"
                        >
                            <PaymentSummary
                                subtotal={totalPrice}
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.3,
                                    duration: 0.3,
                                }}
                            >
                                <PlaceOrderButton
                                    selectedAddressId={selectedAddressId}
                                    paymentMethod={paymentMethod}
                                    onSuccess={(response) => {
                                        navigate(
                                            `/order-confirmation/${response.order._id}`,
                                            {
                                                replace: true,
                                            }
                                        );
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                )}

            </div>
        </div>
    );
};

export default Payment;