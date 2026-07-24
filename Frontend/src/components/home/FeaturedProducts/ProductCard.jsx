import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                <div className="relative h-36 xs:h-44 sm:h-52 bg-gray-50 flex items-end justify-center overflow-hidden">
                    <img
                        src={product.image.url}
                        alt={product.productName}
                        loading="lazy"
                        className="max-h-full w-full object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
                    />

                    <button
                        onClick={(e) => e.preventDefault()}
                        aria-label="Add to wishlist"
                        className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white shadow-md active:scale-95 transition"
                    >
                        <Heart size={14} className="sm:hidden" />
                        <Heart size={18} className="hidden sm:block" />
                    </button>
                </div>

                <div className="flex flex-1 flex-col p-2.5 xs:p-3 sm:p-4">

                    <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#0A3D91]">
                        {product.category}
                    </span>

                    <h3 className="mt-1 sm:mt-2 line-clamp-2 min-h-[2.1rem] sm:min-h-10.5 text-xs xs:text-sm sm:text-base font-semibold leading-4 sm:leading-5 text-gray-900 transition-colors duration-300 group-hover:text-[#0A3D91]">
                        {product.productName}
                    </h3>

                    <div className="sm:mt-0">
                        <span className="text-sm xs:text-base sm:text-xl font-bold text-gray-900 group-hover:text-[#0A3D91]">
                            ₹{product.price.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <button
                        onClick={(e) => e.preventDefault()}
                        className="mt-2 sm:mt-4 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border-2 border-[#0A3D91] bg-white py-2 text-xs font-semibold text-[#0A3D91] transition-all hover:bg-indigo-50 active:scale-[0.98] xs:gap-2 xs:py-2.5 xs:text-sm sm:h-10 sm:rounded-xl sm:py-3 sm:text-base"
                    >
                        <ShoppingCart size={14} className="sm:hidden" />
                        <ShoppingCart size={18} className="hidden sm:block" />
                        
                        <span className="sm:hidden">Add</span>

                        <span className="hidden sm:inline">Add to Cart</span>
                    </button>

                </div>
            </article>
        </Link>
    );
};

export default ProductCard;