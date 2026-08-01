import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";

import useCart from "../hooks/useCart";

import AddressSelector from "../components/checkout/AddressSelector";
import CheckoutProducts from "../components/checkout/CheckoutProducts";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import ContinueToPaymentButton from "../components/checkout/ContinueToPaymentButton";

const Checkout = () => {
    const navigate = useNavigate();

    const {
        cart,
        totalPrice,
        initialLoading,
    } = useCart();

    const [selectedAddressId, setSelectedAddressId] = useState(null);

    useEffect(() => {
    if (!initialLoading && cart.length === 0) {
        navigate("/cart", {
            replace: true,
        });
    }
}, [cart, initialLoading, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 pb-8 lg:pb-8">
            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-2 lg:px-8">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">

                    <button
                        onClick={() => navigate("/cart")}
                        className="flex items-center gap-1.5 rounded-lg py-2 pr-2 text-sm font-medium text-gray-600 transition-colors hover:cursor-pointer hover:text-black sm:gap-2 sm:text-base"
                    >
                        <ArrowLeft size={18} className="shrink-0" />
                        <span className="hidden sm:inline">Back to Cart</span>
                        <span className="sm:hidden">Back</span>
                    </button>

                </div>

                {initialLoading ? (

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start animate-pulse">

                        {/* Left */}
                        <div className="space-y-6 lg:col-span-2">

                            {/* Address */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <div className="h-6 w-48 rounded bg-gray-200" />
                                <div className="mt-2 h-4 w-72 rounded bg-gray-100" />

                                <div className="mt-6 rounded-xl border border-gray-100 p-5">
                                    <div className="h-5 w-24 rounded bg-gray-200" />
                                    <div className="mt-5 h-5 w-52 rounded bg-gray-200" />
                                    <div className="mt-3 h-4 w-40 rounded bg-gray-100" />
                                    <div className="mt-3 h-4 w-full rounded bg-gray-100" />
                                    <div className="mt-2 h-4 w-4/5 rounded bg-gray-100" />
                                </div>
                            </div>

                            {/* Products */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <div className="h-6 w-36 rounded bg-gray-200" />

                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="mt-6 flex gap-4"
                                    >
                                        <div className="h-24 w-24 rounded-lg bg-gray-200" />
                                        <div className="flex-1">
                                            <div className="h-5 w-60 rounded bg-gray-200" />
                                            <div className="mt-3 h-4 w-32 rounded bg-gray-100" />
                                            <div className="mt-3 h-4 w-24 rounded bg-gray-100" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Right */}
                        <div className="space-y-4">

                            <div className="rounded-xl border border-gray-200 bg-white p-6">

                                <div className="h-6 w-36 rounded bg-gray-200" />

                                <div className="mt-8 space-y-4">

                                    <div className="flex justify-between">
                                        <div className="h-4 w-24 rounded bg-gray-100" />
                                        <div className="h-4 w-20 rounded bg-gray-100" />
                                    </div>

                                    <div className="flex justify-between">
                                        <div className="h-4 w-24 rounded bg-gray-100" />
                                        <div className="h-4 w-16 rounded bg-gray-100" />
                                    </div>

                                    <div className="border-t border-gray-200 pt-5 flex justify-between">
                                        <div className="h-5 w-16 rounded bg-gray-200" />
                                        <div className="h-5 w-24 rounded bg-gray-200" />
                                    </div>

                                </div>

                            </div>

                            <div className="h-14 rounded-xl bg-gray-200" />

                        </div>

                    </div>
                ) : (

                    <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:items-start">

                        {/* Left */}
                        <div className="space-y-5 sm:space-y-6 lg:col-span-2">

                            <AddressSelector
                                selectedAddressId={selectedAddressId}
                                setSelectedAddressId={setSelectedAddressId}
                            />

                            <CheckoutProducts
                                cartItems={cart}
                            />

                        </div>

                        {/* Right */}
                        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">

                            <CheckoutSummary
                                subtotal={totalPrice}
                            />

                            {/* Desktop / tablet CTA - inline with summary */}
                            <div className="hidden lg:block">
                                <ContinueToPaymentButton
                                    selectedAddressId={selectedAddressId}
                                />
                            </div>

                        </div>

                    </div>

                )}

            </div>

            {/* Mobile sticky payment action button */}
            {!initialLoading && (
                <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white/95 p-4 backdrop-blur-sm shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden">
                    <div className="mx-auto max-w-7xl">
                        <ContinueToPaymentButton
                            selectedAddressId={selectedAddressId}
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default Checkout;