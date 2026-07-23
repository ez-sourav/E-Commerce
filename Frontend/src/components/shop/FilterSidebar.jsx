import { FiRotateCcw, FiSliders } from "react-icons/fi";

const FilterSidebar = ({
  categories = [],
  selectedCategory = "All",
  maxPrice = 0,
  highestPrice = 0,
  onCategoryChange,
  onPriceChange,
  inStockOnly = false,
  onStockChange,
  onClearFilters,
}) => {
  const hasActiveFilters =
    selectedCategory !== "All" || inStockOnly || maxPrice < highestPrice;

  return (
    <aside className="sticky top-24 flex max-h-[calc(100vh-7rem)] w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-4 lg:px-5 xl:px-6">
        <div className="flex items-center gap-2">
          <FiSliders size={17} className="shrink-0 text-[#0A3D91]" />
          <h2 className="text-base font-semibold text-gray-900 lg:text-lg xl:text-xl">
            Filters
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-[#0A3D91] transition hover:bg-blue-50 hover:text-[#082f73] lg:text-sm"
          >
            <FiRotateCcw size={13} className="lg:hidden" />
            <FiRotateCcw size={14} className="hidden lg:block" />
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 lg:px-5 xl:px-6">
      
        <div className="border-b border-gray-100 py-5 lg:py-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 lg:mb-4">
            Categories
          </h3>

          <div className="space-y-1">
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <label
                  key={category}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition ${
                    isActive ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
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

        <div className="border-b border-gray-100 py-5 lg:py-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 lg:mb-4">
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

          <div className="mt-3 flex flex-wrap items-center justify-between gap-1 text-sm text-gray-600">
            <span>₹0</span>

            <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-[#0A3D91]">
              ₹{maxPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <p className="mt-2 text-xs text-gray-400">
            Maximum available: ₹{highestPrice.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Availability */}
        <div className="py-5 lg:py-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 lg:mb-4">
            Availability
          </h3>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-50">
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
    </aside>
  );
};

export default FilterSidebar;