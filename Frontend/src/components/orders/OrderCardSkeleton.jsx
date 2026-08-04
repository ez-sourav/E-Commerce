const OrderCardSkeleton = () => {
    return (
        <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-3 sm:gap-4">
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-100 sm:h-24 sm:w-24" />

                    <div className="flex-1 space-y-3 py-1">
                        <div className="h-4 w-40 rounded bg-gray-100 sm:w-56" />
                        <div className="h-3 w-24 rounded bg-gray-100" />
                        <div className="flex gap-2">
                            <div className="h-6 w-20 rounded-full bg-gray-100" />
                            <div className="h-6 w-24 rounded-full bg-gray-100" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 sm:text-right">
                    <div className="h-3 w-12 rounded bg-gray-100 sm:ml-auto" />
                    <div className="h-5 w-20 rounded bg-gray-100 sm:ml-auto" />
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 sm:mt-6 sm:pt-5">
                <div className="space-y-2">
                    <div className="h-3 w-16 rounded bg-gray-100" />
                    <div className="h-3 w-28 rounded bg-gray-100" />
                </div>
                <div className="h-10 w-32 rounded-xl bg-gray-100" />
            </div>
        </div>
    );
};

export default OrderCardSkeleton;