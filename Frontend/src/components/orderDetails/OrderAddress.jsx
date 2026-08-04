import { Home, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const OrderAddress = ({ address }) => {
    if (!address) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
        >
            {/* Header */}
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A3D91]/10 sm:h-11 sm:w-11">
                    <MapPin
                        size={20}
                        className="text-[#0A3D91]"
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                        Delivery Address
                    </h2>

                    <p className="text-xs text-gray-500 sm:text-sm">
                        Shipping destination for this order
                    </p>
                </div>
            </div>

            {/* Customer Name */}
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A3D91]/10">
                    <Home
                        size={16}
                        className="text-[#0A3D91]"
                    />
                </div>

                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                    {address.fullName}
                </h3>
            </div>

            {/* Mobile */}
            <div className="mt-4 flex items-center gap-3 pl-12">
                <Phone
                    size={16}
                    className="shrink-0 text-gray-400"
                />

                <span className="text-sm text-gray-700">
                    {address.mobile}
                </span>
            </div>

            {/* Address */}
            <div className="mt-4 flex items-start gap-3 pl-12">
                <MapPin
                    size={16}
                    className="mt-1 shrink-0 text-gray-400"
                />

                <p className="text-sm leading-7 text-gray-600">
                    {[
                        address.houseNo,
                        address.building,
                        address.landmark,
                        address.city,
                        address.state,
                        address.postalCode,
                        address.country,
                    ]
                        .filter(Boolean)
                        .join(", ")}
                </p>
            </div>
        </motion.div>
    );
};

export default OrderAddress;