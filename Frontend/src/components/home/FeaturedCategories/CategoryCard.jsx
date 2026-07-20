import { ArrowRight } from "lucide-react";

const CategoryCard = ({ category }) => {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-[0_10px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] active:scale-[0.98] transition-all duration-500 cursor-pointer">
      
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent sm:from-black/60 opacity-90 sm:opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-x-0 bottom-0 p-3 xs:p-4 sm:p-6 z-10">
        <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
          {category.name}
        </h3>

        <div className="mt-1.5 sm:mt-3 flex items-center justify-between gap-2">
         
          <span className="rounded-full border border-white/30 bg-white/20 backdrop-blur-md px-2.5 py-0.5 sm:px-4 sm:py-1 text-xs sm:text-sm font-medium text-white whitespace-nowrap">
            {category.count} {category.count === 1 ? "Product" : "Products"}
          </span>

          <div className="flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-white text-black opacity-0 sm:opacity-0 translate-x-2 sm:translate-x-4 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-active:opacity-100 group-active:translate-x-0">
            <ArrowRight size={16} className="sm:hidden" />
            <ArrowRight size={18} className="hidden sm:block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;