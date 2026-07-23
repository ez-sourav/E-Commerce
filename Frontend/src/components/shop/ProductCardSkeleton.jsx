import { motion } from "framer-motion";

const ProductCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl"
    >
      {/* Image */}
      <div className="aspect-4/5 bg-gray-200" />

      {/* Content */}
      <div className="space-y-2 p-3 sm:space-y-4 sm:p-5">
        {/* Category */}
        <div className="h-2.5 w-16 rounded-full bg-gray-200 sm:h-3 sm:w-20" />

        {/* Product Name */}
        <div className="space-y-2">
          <div className="h-3.5 w-full rounded bg-gray-200 sm:h-4" />
          <div className="h-3.5 w-3/4 rounded bg-gray-200 sm:h-4" />
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-16 rounded bg-gray-200 sm:h-6 sm:w-24" />
          <div className="h-5 w-16 rounded-full bg-gray-200 sm:h-6 sm:w-20" />
        </div>

        {/* Button */}
        <div className="h-9 w-full rounded-lg bg-gray-200 sm:h-11 sm:rounded-xl" />
      </div>
    </motion.div>
  );
};

export default ProductCardSkeleton;