import { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/productService";
import CategoryCard from "./CategoryCard";
import { categoryImages } from "./categoryImages";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const data = await getAllProducts();
        const products = data.products || [];

        const categoryMap = new Map();

        products.forEach((product) => {
          const categoryName = product.category;

          if (categoryMap.has(categoryName)) {
            categoryMap.get(categoryName).count += 1;
          } else {
            categoryMap.set(categoryName, {
              name: categoryName,
              count: 1,
              image: categoryImages[categoryName] || categoryImages.default,
            });
          }
        });

        const sortedCategories = [...categoryMap.values()].sort(
          (a, b) => b.count - a.count
        );

        setCategories(sortedCategories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const SkeletonCard = () => (
    <div className="aspect-square w-[72%] min-w-60 max-w-70 shrink-0 snap-center sm:w-full sm:min-w-0 sm:max-w-none animate-pulse rounded-2xl bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 shadow-sm">
      <div className="h-full w-full rounded-2xl bg-linear-to-br from-gray-200/80 to-gray-300/80" />
    </div>
  );

  return (
    <section id="categories" className="bg-white py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 text-center md:mb-10 lg:mb-12">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
            Shop by Category
          </h2>
          <p className="mx-auto mt-3 max-w-2xl px-2 text-sm text-gray-500 sm:mt-4 sm:text-base md:text-lg">
            Explore our curated collections featuring the latest trends in
            technology, fashion, and lifestyle.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 sm:overflow-visible sm:snap-none sm:pb-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && hasError && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <svg className="h-8 w-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Couldn't load categories right now.</p>
            <button onClick={() => window.location.reload()} className="mt-4 rounded-full bg-[#0A3D91] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#0A3D91]/90 active:scale-95">
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !hasError && categories.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-400">No categories available yet.</p>
            <p className="mt-2 text-xs text-gray-300">Check back soon for new collections!</p>
          </div>
        )}

        {/* Categories Grid */}
        {!isLoading && !hasError && categories.length > 0 && (
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 sm:overflow-visible sm:snap-none sm:pb-0">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;