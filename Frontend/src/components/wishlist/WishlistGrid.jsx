import { motion, AnimatePresence } from "framer-motion";
import WishlistCard from "./WishlistCard";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.07,
        },
    },
};

const WishlistGrid = ({ wishlist }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5"
        >
            <AnimatePresence mode="popLayout">
                {wishlist.map((item) => (
                    <WishlistCard
                        key={item.product._id}
                        item={item}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default WishlistGrid;