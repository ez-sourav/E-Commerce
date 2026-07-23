import { FiX, FiRotateCcw } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const MobileFilterDrawer = ({
  isOpen,
  onClose,
  categories = [],
  selectedCategory = "All",
  onCategoryChange,
  maxPrice = 80000,
  highestPrice = 80000,
  onPriceChange,
  inStockOnly = false,
  onStockChange,
  onClearFilters,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 z-50 flex h-[100dvh] w-[88vw] max-w-[22rem] flex-col bg-white shadow-xl xs:w-[85vw] sm:w-96 md:w-[26rem] lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 p-3.5 xs:p-4 sm:p-5">
              <h2 className="text-base font-semibold text-gray-900 xs:text-lg sm:text-xl">
                Filters
              </h2>

              <button
                onClick={onClose}
                aria-label="Close filters"
                className="rounded-lg p-1.5 transition hover:bg-gray-100 active:scale-95 xs:p-2"
              >
                <FiX size={20} className="xs:hidden" />
                <FiX size={22} className="hidden xs:block" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3.5 xs:p-4 sm:p-5">
              {/* Categories */}
              <div className="border-b border-gray-200 pb-5 xs:pb-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 xs:mb-4">
                  Categories
                </h3>

                <div className="space-y-1">
                  {categories.map((category) => {
                    const isActive = selectedCategory === category;

                    return (
                      <label
                        key={category}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 transition ${
                          isActive ? "bg-blue-50" : "active:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="mobile-category"
                          value={category}
                          checked={isActive}
                          onChange={() => onCategoryChange(category)}
                          className="h-4 w-4 shrink-0 accent-[#0A3D91]"
                        />

                        <span
                          className={`truncate text-sm ${
                            isActive
                              ? "font-medium text-[#0A3D91]"
                              : "text-gray-700"
                          }`}
                        >
                          {category}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="border-b border-gray-200 py-5 xs:py-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 xs:mb-4">
                  Maximum Price
                </h3>

                <input
                  type="range"
                  min={0}
                  max={highestPrice}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => onPriceChange(Number(e.target.value))}
                  className="w-full cursor-grab accent-[#0A3D91] active:cursor-grabbing"
                />

                <div className="mt-3 flex flex-wrap justify-between gap-1 text-sm text-gray-600">
                  <span>₹0</span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-[#0A3D91]">
                    ₹{maxPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="py-5 xs:py-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 xs:mb-4">
                  Availability
                </h3>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 transition active:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => onStockChange(e.target.checked)}
                    className="h-4 w-4 shrink-0 rounded accent-[#0A3D91]"
                  />

                  <span className="text-sm text-gray-700">In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="shrink-0 border-t border-gray-200 p-3.5 pb-[calc(env(safe-area-inset-bottom)+0.875rem)] xs:p-4 xs:pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:p-5">
              <button
                onClick={onClearFilters}
                className="mb-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#0A3D91] py-2.5 text-sm font-medium text-[#0A3D91] transition active:bg-blue-50 xs:mb-3 xs:py-3 xs:text-base"
              >
                <FiRotateCcw size={16} className="xs:hidden" />
                <FiRotateCcw size={18} className="hidden xs:block" />
                Clear All
              </button>

              <button
                onClick={onClose}
                className="w-full rounded-xl bg-[#0A3D91] py-2.5 text-sm font-medium text-white transition active:bg-[#082f73] xs:py-3 xs:text-base"
              >
                Apply Filters
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileFilterDrawer;