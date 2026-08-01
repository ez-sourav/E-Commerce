import { Truck, Sparkles } from "lucide-react";

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
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="mb-5 text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl">
                Price Details
            </h2>

            {/* Free shipping nudge */}
            {shippingCharge > 0 && (
                <div className="mb-5 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5 text-xs text-gray-600 sm:text-sm">
                    <Sparkles size={14} className="shrink-0 text-gray-400" />
                    <span>
                        Add{" "}
                        <span className="font-semibold text-gray-900">
                            {formatPrice(amountToFreeShipping)}
                        </span>{" "}
                        more for free shipping
                    </span>
                </div>
            )}

            {/* Price Details */}
            <div className="space-y-3">

                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                        Subtotal
                    </span>

                    <span className="font-medium text-gray-900">
                        {formatPrice(subtotal)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">

                    <div className="flex items-center gap-2 text-gray-600">
                        <Truck size={16} className="shrink-0" />
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

            <div className="mt-4 border-t border-dashed border-gray-200 pt-4">

                <div className="flex items-end justify-between">

                    <span className="text-base font-semibold text-gray-900 sm:text-lg">
                        Total
                    </span>

                    <span className="text-xl font-bold text-black sm:text-2xl">
                        {formatPrice(total)}
                    </span>

                </div>

            </div>

        </div>
    );
};

export default CheckoutSummary;