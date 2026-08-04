import { Heart, Package } from "lucide-react";
import { motion } from "framer-motion";

const WishlistHeader = ({ totalItems }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-5 flex items-center justify-between gap-4 sm:mb-6"
        >
            {/* Left */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                    <Heart
                        size={20}
                        className="fill-red-500 text-red-500"
                    />
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                            My Wishlist
                        </h1>

                        {/* Mobile Badge */}
                        <span className="flex items-center gap-1 rounded-full bg-[#0A3D91]/10 px-2.5 py-1 text-xs font-semibold text-[#0A3D91] sm:hidden">
                            <Package size={12} />
                            {totalItems}
                        </span>
                    </div>

                    <p className="mt-0.5 text-sm text-gray-500">
                        Save your favourite products for later.
                    </p>
                </div>
            </div>

            {/* Desktop Counter */}
            <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm sm:flex">
                <Package
                    size={16}
                    className="text-[#0A3D91]"
                />

                <span className="text-sm text-gray-500">
                    Items
                </span>

                <span className="text-lg font-bold text-[#0A3D91]">
                    {totalItems}
                </span>
            </div>
        </motion.div>
    );
};

export default WishlistHeader;