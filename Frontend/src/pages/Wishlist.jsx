import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import useWishlist from "../hooks/useWishlist";

import WishlistHeader from "../components/wishlist/WishlistHeader";
import WishlistGrid from "../components/wishlist/WishlistGrid";
import EmptyWishlist from "../components/wishlist/EmptyWishlist";
import WishlistSkeleton from "../components/wishlist/WishlistSkeleton";

const Wishlist = () => {
    const { wishlist, loading } = useWishlist();

    const totalItems = useMemo(() => wishlist.length, [wishlist]);

    const stateKey = loading
        ? "loading"
        : totalItems === 0
        ? "empty"
        : "grid";

    return (
        <div className="bg-gray-50 py-6 sm:py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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