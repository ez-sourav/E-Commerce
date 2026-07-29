import { Search, X } from "lucide-react";

const SearchBar = ({
  mobile = false,
  search,
  setSearch,
  handleSearch,
  handleKeyDown,
  searchInputRef,
}) => {
  return (
    <label
      className={
        mobile
          ? "relative block"
          : "relative hidden w-80 lg:block xl:w-125"
      }
    >
      <span className="sr-only">Search products</span>

      <button
        type="button"
        onClick={handleSearch}
        className={`absolute left-4 top-1/2 -translate-y-1/2 ${
          mobile
            ? "text-gray-900 hover:text-[#0A3D91]"
            : "text-gray-500 hover:text-[#0A3D91]"
        }`}
      >
        <Search size={mobile ? 18 : 17} />
      </button>

      <input
        ref={searchInputRef}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for Products and More"
        className={`w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-11 text-sm text-gray-800 outline-none transition focus:border-[#0A3D91] focus:bg-white ${
          mobile
            ? "placeholder:text-gray-900"
            : "placeholder:text-gray-400"
        }`}
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900 transition hover:text-gray-700"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </label>
  );
};

export default SearchBar;