import { FiSearch } from "react-icons/fi";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

// Fluid grid: columns adapt to available width instead of jumping at
// fixed breakpoints, so it looks right on every phone, tablet, and
// desktop size - not just the ones we happened to test.
const GRID_CLASSES =
  "grid gap-3 grid-cols-[repeat(auto-fill,minmax(150px,1fr))] " +
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
      <section className="flex min-h-75 items-center justify-center px-4 sm:min-h-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 sm:text-2xl">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className="flex min-h-95 items-center justify-center px-4 sm:min-h-105">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 sm:h-16 sm:w-16">
            <FiSearch size={26} className="text-[#0A3D91]" />
          </div>

          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            No Products Found
          </h2>

          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            We couldn't find any products matching your current search and filters.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">

            {searchQuery && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 sm:text-sm">
                Search: "{searchQuery}"
              </span>
            )}

            {selectedCategory !== "All" && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 sm:text-sm">
                Category: {selectedCategory}
              </span>
            )}

            {inStockOnly && (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 sm:text-sm">
                In Stock Only
              </span>
            )}

          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">

            {searchQuery && (
              <button
                onClick={clearSearch}
                className="rounded-lg bg-[#0A3D91] px-4 py-2 text-sm text-white transition hover:bg-[#083170] sm:px-5"
              >
                Clear Search
              </button>
            )}

            <button
              onClick={clearFilters}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 sm:px-5"
            >
              Clear Filters
            </button>

            <button
              onClick={clearAll}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 sm:px-5"
            >
              Clear All
            </button>

          </div>

        </div>
      </section>
    );
  }

  return (
    <section className={GRID_CLASSES}>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </section>
  );
};

export default ProductGrid;