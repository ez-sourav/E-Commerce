const ManageAddressCardSkeleton = () => {
    return (
        <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="h-5 w-32 rounded-full bg-gray-100" />

            <div className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gray-100" />
                <div className="h-4 w-36 rounded bg-gray-100" />
            </div>

            <div className="mt-4 h-3 w-28 rounded bg-gray-100 pl-13" />
            <div className="mt-3 h-3 w-full rounded bg-gray-100" />
            <div className="mt-2 h-3 w-2/3 rounded bg-gray-100" />

            <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">
                <div className="h-9 w-20 rounded-lg bg-gray-100" />
                <div className="h-9 w-24 rounded-lg bg-gray-100" />
            </div>
        </div>
    );
};

export default ManageAddressCardSkeleton;
