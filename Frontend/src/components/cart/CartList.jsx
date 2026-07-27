import { motion, AnimatePresence } from "framer-motion";
import useCart from "../../hooks/useCart";
import CartItem from "./CartItem";

const CartList = () => {
    const { cart } = useCart();

    if (!cart || cart.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <AnimatePresence mode="popLayout">
                {cart.map((item, index) => {
                    const variantKey = item.selectedVariant?.attributes
                        ? JSON.stringify(item.selectedVariant.attributes)
                        : "";

                    return (
                        <motion.div
                            key={`${item.product._id}-${variantKey}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            layout
                        >
                            <CartItem item={item} />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default CartList;