import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import useWishlist from "../hooks/useWishlist";

import WishlistHeader from "../components/wishlist/WishlistHeader";
import WishlistGrid from "../components/wishlist/WishlistGrid";
import EmptyWishlist from "../components/wishlist/EmptyWishlist";
import WishlistSkeleton from "../components/wishlist/WishlistSkeleton";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const { wishlist, loading } = useWishlist();
 const navigate = useNavigate();
    const totalItems = useMemo(() => wishlist.length, [wishlist]);

    const stateKey = loading
        ? "loading"
        : totalItems === 0
        ? "empty"
        : "grid";

    return (
        <div className="bg-gray-50 py-6 sm:py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-black"
                    >
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </button>
                <WishlistHeader totalItems={totalItems} />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={stateKey}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {loading ? (
                            <WishlistSkeleton />
                        ) : totalItems === 0 ? (
                            <EmptyWishlist />
                        ) : (
                            <WishlistGrid wishlist={wishlist} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Wishlist;