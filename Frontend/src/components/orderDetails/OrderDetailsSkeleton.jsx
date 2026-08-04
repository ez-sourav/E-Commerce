const Block = ({ className = "" }) => (
    <div className={`animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
        <div className="mb-6 flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gray-100" />
            <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-100" />
                <div className="h-3 w-44 rounded bg-gray-100" />
            </div>
        </div>
        <div className="space-y-3">
            <div className="h-3 w-full rounded bg-gray-100" />
            <div className="h-3 w-5/6 rounded bg-gray-100" />
            <div className="h-3 w-2/3 rounded bg-gray-100" />
        </div>
    </div>
);

const OrderDetailsSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4">

                <div className="mb-8">
                    <div className="mb-5 h-4 w-16 animate-pulse rounded bg-gray-200" />

                    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-3">
                                <div className="h-7 w-48 rounded bg-gray-100" />
                                <div className="h-4 w-40 rounded bg-gray-100" />
                            </div>
                            <div className="h-11 w-44 rounded-xl bg-gray-100" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <Block />
                        <Block />
                    </div>
                    <div className="space-y-6">
                        <Block />
                        <Block />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderDetailsSkeleton;