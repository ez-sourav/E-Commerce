import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmptyWishlist = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center shadow-sm sm:py-20"
        >
            <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 sm:h-24 sm:w-24"
            >
                <Heart
                    size={38}
                    className="fill-red-500 text-red-500 sm:h-11 sm:w-11"
                />
            </motion.div>

            <h2 className="mt-6 text-xl font-bold text-gray-900 sm:mt-8 sm:text-2xl">
                Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-md text-sm text-gray-500 sm:text-base">
                Save your favourite products so you can
                easily find them later and purchase them
                anytime.
            </p>

            <Link to="/shop">
                <motion.span
                    whileTap={{ scale: 0.96 }}
                    className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#0A3D91] px-6 py-3 font-medium text-white transition hover:bg-[#08306f] sm:mt-8"
                >
                    Continue Shopping
                </motion.span>
            </Link>
        </motion.div>
    );
};

export default EmptyWishlist;