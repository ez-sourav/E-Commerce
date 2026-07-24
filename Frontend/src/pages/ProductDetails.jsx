import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, PackageX } from "lucide-react";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductSkeleton from "../components/product/ProductSkeleton";

import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProductById(id);

      if (response.success) {
        setProduct(response.product);
      } else {
        setError(response.message || "Product not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <PackageX size={26} className="text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-gray-900">{error}</h2>

          <p className="mt-2 text-sm text-gray-500">
            The product you're looking for could not be found.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
    
      <div className="container mx-auto px-4 pb-8 pt-4 sm:pt-6">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-1.5 text-xs text-gray-500 sm:mb-6 sm:text-sm">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-indigo-600">
            Shop
          </Link>
          <ChevronRight size={14} />
          <span className="truncate text-gray-900">{product.productName}</span>
        </nav>

        <section className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="self-start lg:sticky lg:top-24">
            <ProductGallery product={product} />
          </div>

          <ProductInfo product={product} />
        </section>

        <div className="mt-10 space-y-10 sm:mt-14">
          <RelatedProducts
            category={product.category}
            currentProductId={product._id}
          />
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;