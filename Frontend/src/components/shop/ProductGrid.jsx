import { FiSearch } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

// Fluid grid: Adjusted micro mobile scale to 130px to guarantee clean
// two-column grids on ultra-narrow 320px devices without clipping text metadata.
const GRID_CLASSES =
  "grid gap-2.5 grid-cols-[repeat(auto-fill,minmax(130px,1fr))] " +
  "xs:gap-3 xs:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] " +
  "sm:gap-4 sm:grid-cols-[repeat(auto-fill,minmax(190px,1fr))] " +
  "lg:grid-cols-[repeat(auto-fill,minmax(215px,1fr))] " +
  "2xl:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]";

const ProductGrid = ({
  products = [],
  loading = false,
  error = "",
  searchQuery,
  selectedCategory,
  inStockOnly,
  clearSearch,
  clearFilters,
  clearAll,
  loaderRef,
  isLoadingMore,
  hasMore,
}) => {

  if (loading) {
    return (
      <section className={GRID_CLASSES}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      /* Replaced hardcoded heights with viewport rules to safely adapt across displays */
      <section className="flex min-h-[40vh] items-center justify-center px-4 py-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-600 xs:text-xl sm:text-2xl">
            Something went wrong
          </h2>

          <p className="mt-1.5 text-xs text-gray-500 xs:text-sm sm:text-base">
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      /* Cleaned up layout bounds to scale smoothly inside container grids */
      <section className="flex min-h-[60vh] items-center justify-center px-4 py-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-xs xs:p-6 sm:p-8">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 xs:h-14 xs:w-14 sm:h-16 sm:w-16">
            <FiSearch className="h-5 w-5 xs:h-6 xs:w-6 text-[#0A3D91]" />
          </div>

          <h2 className="mt-4 text-xl font-bold xs:text-2xl sm:text-3xl">
            No Products Found
          </h2>

          <p className="mt-2 px-1 text-xs text-gray-500 xs:text-sm sm:text-base leading-relaxed">
            We couldn't find any products matching your current search and filters.
          </p>

          {/* Active filter badges - handles line wraps cleanly */}
          <div className="mt-5 flex flex-wrap justify-center gap-1.5 xs:gap-2">

            {searchQuery && (
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-medium text-blue-700 xs:text-xs sm:text-sm max-w-full truncate">
                Search: "{searchQuery}"
              </span>
            )}

            {selectedCategory !== "All" && (
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-medium text-green-700 xs:text-xs sm:text-sm max-w-full truncate">
                Category: {selectedCategory}
              </span>
            )}

            {inStockOnly && (
              <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[10px] font-medium text-orange-700 xs:text-xs sm:text-sm whitespace-nowrap">
                In Stock Only
              </span>
            )}

          </div>

          <div className="mt-6 flex flex-col gap-2 xs:flex-row xs:flex-wrap xs:justify-center xs:gap-2.5">

            {searchQuery && (
              <button
                onClick={clearSearch}
                className="w-full xs:w-auto rounded-lg bg-[#0A3D91] px-4 py-2 text-xs xs:text-sm font-medium text-white transition hover:bg-[#083170] active:scale-[0.98]"
              >
                Clear Search
              </button>
            )}

            <button
              onClick={clearFilters}
              className="w-full xs:w-auto rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs xs:text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              Clear Filters
            </button>

            <button
              onClick={clearAll}
              className="w-full xs:w-auto rounded-lg border border-red-200 bg-red-50/50 px-4 py-2 text-xs xs:text-sm font-medium text-red-600 transition hover:bg-red-100 active:scale-[0.98]"
            >
              Clear All
            </button>

          </div>

        </div>
      </section>
    );
  }

  return (
    <>
      <section className={GRID_CLASSES}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </section>

      {/* Infinite Scroll Trigger */}
      <div
        ref={loaderRef}
        className="flex justify-center py-6 xs:py-8"
      >
        <AnimatePresence mode="wait">
          {isLoadingMore ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Loader2
                className="h-7 w-7 xs:h-8 xs:w-8 animate-spin text-[#0A3D91]"
              />
            </motion.div>
          ) : hasMore ? (
            <div className="h-6 xs:h-10" />
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProductGrid;
