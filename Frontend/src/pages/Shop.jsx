import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ShopControls from "../components/shop/ShopControls";
import FilterSidebar from "../components/shop/FilterSidebar";
import MobileFilterDrawer from "../components/shop/MobileFilterDrawer";
import ProductGrid from "../components/shop/ProductGrid";
import { getAllProducts } from "../services/productService";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const INITIAL_PRODUCTS = 12;
  const LOAD_MORE_COUNT = 12;

  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const [maxPrice, setMaxPrice] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const [visibleCount, setVisibleCount] = useState(INITIAL_PRODUCTS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef(null);

  const searchQuery = searchParams.get("search")?.toLowerCase().trim() || "";




  const navigate = useNavigate();

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllProducts();

      if (response.success) {
        setProducts(response.products);

        const max = response.products.length
          ? Math.max(...response.products.map((product) => product.price))
          : 0;

        setMaxPrice(max);
      } else {
        setError(response.message || "Failed to load products.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };


  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(products.map((product) => product.category)),
    ];
  }, [products]);

  useEffect(() => {
    const category =
      searchParams.get("category") || "All";

    setSelectedCategory(category);
  }, [searchParams]);

  const highestPrice = useMemo(() => {
    if (!products.length) return 0;

    return Math.max(...products.map((product) => product.price));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Search
      const searchMatch =
        searchQuery === "" ||
        product.productName?.toLowerCase().includes(searchQuery) ||
        product.category?.toLowerCase().includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery) ||
        (
          product.productType === "variant" &&
          product.variants?.some((variant) =>
            Object.values(variant.attributes || {}).some((value) =>
              String(value).toLowerCase().includes(searchQuery)
            )
          )
        );

      // Category
      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      // Price
      const priceMatch = product.price <= maxPrice;

      // Stock
      const stock =
        product.productType === "variant"
          ? product.variants.reduce(
            (total, variant) => total + variant.stock,
            0
          )
          : product.stock;

      const stockMatch = !inStockOnly || stock > 0;

      return (
        searchMatch &&
        categoryMatch &&
        priceMatch &&
        stockMatch
      );
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name":
        result.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        break;

      case "featured":
      default:
        break;
    }

    return result;
  }, [
    products,
    selectedCategory,
    maxPrice,
    inStockOnly,
    sortBy,
    searchQuery,
  ]);

  useEffect(() => {
    setVisibleCount(INITIAL_PRODUCTS);
  }, [
    searchQuery,
    selectedCategory,
    maxPrice,
    inStockOnly,
    sortBy,
  ]);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (selectedCategory !== "All") count += 1;
    if (inStockOnly) count += 1;
    if (highestPrice > 0 && maxPrice < highestPrice) count += 1;

    return count;
  }, [selectedCategory, inStockOnly, maxPrice, highestPrice]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const params = new URLSearchParams(searchParams);

    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    navigate(
      params.toString()
        ? `/shop?${params.toString()}`
        : "/shop",
      {
        replace: true,
      }
    );
  };

  useEffect(() => {
    if (
      loading ||
      visibleCount >= filteredProducts.length
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsLoadingMore(true);

        setTimeout(() => {
          setVisibleCount((prev) =>
            Math.min(
              prev + LOAD_MORE_COUNT,
              filteredProducts.length
            )
          );

          setIsLoadingMore(false);
        }, 500);
      },
      {
        threshold: 0.2,
      }
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [
    loading,
    visibleCount,
    filteredProducts.length,
  ]);

  const clearFilters = () => {
    handleCategoryChange("All");
    setMaxPrice(highestPrice);
    setInStockOnly(false);
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("search");

    navigate(
      params.toString()
        ? `/shop?${params.toString()}`
        : "/shop",
      { replace: true }
    );
  };

  const clearAll = () => {
    setSelectedCategory("All");
    setMaxPrice(highestPrice);
    setInStockOnly(false);

    navigate("/shop", {
      replace: true,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <ShopControls
          totalProducts={filteredProducts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onOpenFilters={() => setIsFilterOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden shrink-0 lg:block lg:w-64 xl:w-72">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              maxPrice={maxPrice}
              highestPrice={highestPrice}
              onCategoryChange={handleCategoryChange}
              onPriceChange={setMaxPrice}
              inStockOnly={inStockOnly}
              onStockChange={setInStockOnly}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Product Grid */}
          <div className="min-w-0 flex-1">
            <ProductGrid
              products={filteredProducts.slice(
                0,
                visibleCount
              )}
              loading={loading}
              error={error}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              inStockOnly={inStockOnly}
              clearSearch={clearSearch}
              clearFilters={clearFilters}
              clearAll={clearAll}
              loaderRef={loaderRef}
              isLoadingMore={isLoadingMore}
              hasMore={
                visibleCount < filteredProducts.length
              }
            />
          </div>
        </div>

        {/* Mobile Filters */}
        <MobileFilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          categories={categories}
          selectedCategory={selectedCategory}
          maxPrice={maxPrice}
          highestPrice={highestPrice}
          onCategoryChange={handleCategoryChange}
          onPriceChange={setMaxPrice}
          inStockOnly={inStockOnly}
          onStockChange={setInStockOnly}
          onClearFilters={clearFilters}
        />
      </div>
    </main>
  );
};

export default Shop;