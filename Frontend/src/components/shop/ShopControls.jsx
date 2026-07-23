import { FiFilter, FiChevronDown } from "react-icons/fi";

const ShopControls = ({
  totalProducts = 0,
  sortBy = "featured",
  onSortChange,
  onOpenFilters,
  activeFilterCount = 0,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:mb-8 sm:gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left Side */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
          Shop Products
        </h2>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Showing{" "}
          <span className="font-semibold text-[#0A3D91]">
            {totalProducts}
          </span>{" "}
          Products
        </p>
      </div>

      {/* Right Side */}
      <div className="flex w-full items-center gap-2 md:w-auto sm:gap-3">
        {/* Mobile Filter Button */}
        <button
          onClick={onOpenFilters}
          className="relative flex w-1/2 items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-100 active:scale-[0.98] lg:hidden sm:w-auto"
        >
          <FiFilter size={16} />

          <span>Filters</span>

          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0A3D91] text-[11px] font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="relative w-1/2 sm:w-52">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="
              h-10
              w-full
              appearance-none
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              pr-10
              text-sm
              font-medium
              text-gray-700
              outline-none
              transition-all
              hover:border-[#0A3D91]
              focus:border-[#0A3D91]
              focus:ring-2
              focus:ring-[#0A3D91]/20
            "
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A - Z</option>
          </select>

          <FiChevronDown
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopControls;