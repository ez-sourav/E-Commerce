import { motion } from "framer-motion";
import useCart from "../hooks/useCart";
import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

const Cart = () => {
  const { cart, totalPrice, initialLoading } = useCart();
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (initialLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black sm:h-12 sm:w-12"></div>
            <p className="mt-4 text-sm text-gray-500 sm:text-base">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-4 py-6 sm:py-10"
    >
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Shopping Cart</h1>
        <p className="mt-1.5 text-sm text-gray-500 sm:mt-2 sm:text-base">
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </motion.div>

      {/* Grid Layout */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
      >
        <div className="lg:col-span-2">
          <CartList />
        </div>
        <div>
          <CartSummary totalPrice={totalPrice} itemCount={totalItems} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;