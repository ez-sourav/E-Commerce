import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      className="group relative aspect-square w-[72%] min-w-60 max-w-70 sm:w-full sm:min-w-0 sm:max-w-none shrink-0 snap-center overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 active:scale-[0.98]"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent transition-opacity duration-500 group-hover:from-black/85" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-2.5 sm:p-4 lg:p-6">
        <h3 className="text-sm sm:text-lg lg:text-2xl font-bold text-white leading-tight line-clamp-2">
          {category.name}
        </h3>
        <div className="mt-1.5 sm:mt-2 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/20 bg-white/15 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs lg:text-sm font-medium text-white whitespace-nowrap">
            {category.count} {category.count === 1 ? "Product" : "Products"}
          </span>
          <div className="flex h-7 w-7 sm:h-9 sm:w-9 lg:h-11 lg:w-11 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 shadow-md">
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;