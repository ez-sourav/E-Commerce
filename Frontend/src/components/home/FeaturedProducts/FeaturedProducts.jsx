import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../services/productService";
import ProductGrid from "./ProductGrid";
import ProductSkeleton from "./ProductSkeleton";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getAllProducts();

        if (response?.success) {
          setProducts(response.products.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (hasError) return null;

  return (
    <section className="bg-white py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-6 xs:mb-8 md:mb-10 text-center">
          <span className="text-[10px] xs:text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] xs:tracking-[0.2em] sm:tracking-[0.25em] text-[#0A3D91]">
            Trending Collection
          </span>

          <h2 className="mt-1 xs:mt-2 sm:mt-3 text-xl xs:text-2xl font-bold text-gray-900 md:text-5xl sm:text-4xl">
            Featured Products
          </h2>

          <p className="mx-auto mt-2 max-w-2xl px-2 text-xs xs:text-sm md:text-lg sm:text-base text-gray-600 leading-relaxed">
            Discover our curated selection of premium products designed with
            quality, performance, and style in mind.
          </p>
        </div>

        {isLoading ? (
          <ProductSkeleton />
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center text-xs xs:text-sm text-gray-400 py-10">
            No products available right now.
          </p>
        )}

        {!isLoading && products.length > 0 && (
          <div className="mt-8 xs:mt-10 sm:mt-12 flex justify-center">
            <Link
              to="/shop"
              className="rounded-full border border-gray-300 bg-gray-100 px-5 py-2 xs:px-6 xs:py-2.5 sm:px-8 sm:py-3 text-xs xs:text-sm sm:text-base font-semibold text-gray-900 transition-all duration-300 hover:border-gray-200 hover:bg-gray-200 active:scale-[0.98]"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
