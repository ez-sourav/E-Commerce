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
              image: categoryImages[categoryName],
            });
          }
        });

        setCategories([...categoryMap.values()]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="bg-white py-8 sm:py-8 md:py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12 md:mb-10">
          <h2 className="text-2xl font-bold text-gray-900 xs:text-3xl sm:text-4xl md:text-5xl">
            Shop by Category
          </h2>

          <p className="mx-auto mt-3 max-w-2xl px-2 text-sm text-gray-500 sm:mt-4 sm:text-base md:text-lg">
            Explore our curated collections featuring the latest trends in
            technology, fashion, and lifestyle.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-3xl bg-gray-100"
              />
            ))}
          </div>
        )}

        {!isLoading && hasError && (
          <p className="py-10 text-center text-gray-400">
            Couldn't load categories right now. Please try again later.
          </p>
        )}

        {!isLoading && !hasError && categories.length === 0 && (
          <p className="py-10 text-center text-gray-400">
            No categories available yet.
          </p>
        )}

        {!isLoading && !hasError && categories.length > 0 && (
          <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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