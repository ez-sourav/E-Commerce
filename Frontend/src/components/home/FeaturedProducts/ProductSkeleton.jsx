const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-sm animate-pulse"
        >
          <div className="aspect-4/5 bg-gray-200" />

          <div className="space-y-3 sm:space-y-4 p-3 xs:p-4 sm:p-5">
            
            <div className="h-2.5 sm:h-3 w-16 sm:w-20 rounded bg-gray-200" />

            <div className="space-y-1.5 sm:space-y-2">
              <div className="h-4 sm:h-5 w-full rounded bg-gray-200" />
              <div className="h-4 sm:h-5 w-3/4 rounded bg-gray-200" />
            </div>

            <div className="h-5 sm:h-7 w-20 sm:w-24 rounded bg-gray-200" />

            <div className="h-9 sm:h-12 w-full rounded-full bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;