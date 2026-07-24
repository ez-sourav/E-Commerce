const ProductSkeleton = () => {
  return (
    <div className="container mx-auto animate-pulse px-4 py-6 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      
        <div>
          <div className="aspect-square w-full rounded-2xl bg-gray-200" />
          <div className="mt-3 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-16 w-16 rounded-lg bg-gray-200 sm:h-20 sm:w-20"
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 rounded-full bg-gray-200" />
            <div className="h-10 w-10 rounded-full bg-gray-200" />
          </div>

          <div className="mt-4 h-9 w-3/4 rounded bg-gray-200" />

          <div className="mt-4 h-9 w-36 rounded bg-gray-200" />

          <div className="mt-5 space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
          </div>

          <div className="mt-6 h-px bg-gray-100" />

          <div className="mt-6 flex gap-2">
            <div className="h-9 w-24 rounded-full bg-gray-200" />
            <div className="h-9 w-24 rounded-full bg-gray-200" />
            <div className="h-9 w-24 rounded-full bg-gray-200" />
          </div>

          <div className="mt-6 h-10 w-40 rounded-full bg-gray-200" />

          <div className="mt-8 hidden gap-3 sm:grid sm:grid-cols-2">
            <div className="h-12 rounded-full bg-gray-200" />
            <div className="h-12 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-5 h-6 w-48 rounded bg-gray-200" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-5 h-7 w-52 rounded bg-gray-200" />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-3"
            >
              <div className="aspect-square rounded-xl bg-gray-200" />
              <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;