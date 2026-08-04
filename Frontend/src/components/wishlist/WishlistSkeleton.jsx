const WishlistSkeleton = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] animate-pulse bg-gray-200 sm:aspect-square">
                        <div className="absolute right-3 top-3 h-9 w-9 rounded-full bg-gray-300" />
                    </div>

                    <div className="space-y-3 p-4 sm:p-5">
                        {/* Category */}
                        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

                        {/* Product Name */}
                        <div className="space-y-2">
                            <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                        </div>

                        {/* Price */}
                        <div className="h-7 w-28 animate-pulse rounded bg-gray-200" />

                        {/* Button */}
                        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WishlistSkeleton;