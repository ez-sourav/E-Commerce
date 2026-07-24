import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import ProductCard from "../shop/ProductCard";

const RelatedProducts = ({ category, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedProducts();
  }, [category, currentProductId]);

  const fetchRelatedProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();

      if (response.success) {
        const related = response.products
          .filter(
            (product) =>
              product.category === category &&
              product._id !== currentProductId
          )
          .slice(0, 4);

        setProducts(related);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-10 sm:mt-14">
        <h2 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
          Related Products
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-3"
            >
              <div className="aspect-square rounded-xl bg-gray-200" />
              <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="mt-10 sm:mt-14">
      <h2 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
        Related Products
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;