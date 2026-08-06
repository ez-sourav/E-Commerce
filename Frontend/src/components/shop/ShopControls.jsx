import { FiFilter, FiChevronDown } from "react-icons/fi";

const ShopControls = ({
  totalProducts = 0,
  sortBy = "featured",
  onSortChange,
  onOpenFilters,
  activeFilterCount = 0,
}) => {
  return (
    <div className="mb-4 flex flex-col gap-3.5 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs sm:mb-8 sm:gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left Side Info Panel */}
      <div className="flex items-center justify-between md:block">
        <div>
          <h2 className="text-sm xs:text-base font-semibold text-gray-900 sm:text-lg">
            Shop Products
          </h2>

          <p className="mt-0.5 text-[11px] xs:text-xs text-gray-500 sm:text-sm">
            Showing{" "}
            <span className="font-semibold text-[#0A3D91]">
              {totalProducts}
            </span>{" "}
            Products
          </p>
        </div>

        {/* Small desktop filter status badge indicator for tablet views */}
        {activeFilterCount > 0 && (
          <span className="hidden sm:inline-flex md:hidden items-center gap-1.5 rounded-full bg-[#0A3D91]/10 px-2.5 py-1 text-xs font-medium text-[#0A3D91]">
            {activeFilterCount} Filters Active
          </span>
        )}
      </div>

      {/* Right Side Control Bar */}
      {/* Changed flex layout mechanics to flow uniformly across micro viewports */}
      <div className="flex w-full items-center gap-2 xs:gap-3 md:w-auto">
        {/* Mobile Filter Button */}
        <button
          onClick={onOpenFilters}
          className="relative flex h-10 flex-1 items-center justify-center gap-1.5 xs:gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs xs:text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.97] lg:hidden sm:flex-none sm:px-4"
        >
          <FiFilter className="h-3.5 w-3.5 xs:h-4 w-4 shrink-0" />

          <span>Filters</span>

          {activeFilterCount > 0 && (
            <span className="flex h-4.5 w-4.5 xs:h-5 xs:w-5 shrink-0 items-center justify-center rounded-full bg-[#0A3D91] text-[10px] xs:text-[11px] font-semibold text-white shadow-xs">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sorting Dropdown Field Wrapper */}
        <div className="relative flex-1 sm:w-52 sm:flex-none">
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
              pl-3
              pr-8
              xs:pl-4
              xs:pr-10
              text-xs
              xs:text-sm
              font-medium
              text-gray-700
              outline-hidden
              transition-all
              hover:border-[#0A3D91]
              focus:border-[#0A3D91]
              focus:ring-2
              focus:ring-[#0A3D91]/20
              cursor-pointer
            "
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A - Z</option>
          </select>

          <FiChevronDown
            className="pointer-events-none absolute right-2.5 xs:right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopControls;
