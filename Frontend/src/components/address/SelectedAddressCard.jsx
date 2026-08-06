import {
    MapPin,
    Phone,
    Home,
    Plus,
    ChevronRight,
    Check,
} from "lucide-react";

const SelectedAddressCard = ({
    address,
    onChange,
    onAddAddress,
}) => {
    if (!address) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-4 text-center xs:p-6 sm:p-8 md:p-10">
                <span className="mx-auto flex h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#0A3D91]/8">
                    <MapPin className="h-5 w-5 xs:h-6 xs:w-6 text-[#0A3D91]" />
                </span>

                <h3 className="mt-3 text-sm xs:text-base sm:text-lg font-semibold text-gray-900">
                    No Delivery Address Selected
                </h3>

                <p className="mx-auto mt-1.5 max-w-xs text-xs xs:text-sm text-gray-500">
                    Add a delivery address to continue checkout.
                </p>

                <button
                    onClick={onAddAddress}
                    className="mt-4 xs:mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#0A3D91] px-3.5 py-2 xs:px-4 xs:py-2.5 sm:px-5 sm:py-3 text-xs xs:text-sm font-medium text-white transition hover:bg-[#082f73] active:scale-[0.98]"
                >
                    <Plus className="h-3.5 w-3.5 xs:h-4 xs:w-4 shrink-0" />
                    <span>Add Address</span>
                </button>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-3 xs:p-4 sm:p-5 md:p-6 shadow-sm">
            {/* Header */}
            <div className="flex flex-col gap-3 xs:gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                        <MapPin className="h-4 w-4 xs:h-5 xs:w-5 text-[#0A3D91] shrink-0" />
                        <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900 truncate">
                            Delivery Address
                        </h2>
                    </div>

                    <p className="mt-0.5 text-[10px] xs:text-xs sm:text-sm text-gray-500">
                        Your selected delivery address.
                    </p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={onChange}
                        className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1 hover:cursor-pointer rounded-lg border border-[#0A3D91]/25 px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 text-[10px] xs:text-xs sm:text-sm font-medium text-[#0A3D91] transition hover:bg-[#0A3D91]/6 active:scale-[0.98]"
                    >
                        <ChevronRight className="h-3 w-3 xs:h-3.5 xs:w-3.5 shrink-0" />
                        <span className="truncate">Change</span>
                    </button>

                    <button
                        onClick={onAddAddress}
                        className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1 hover:cursor-pointer rounded-lg bg-[#0A3D91] px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 text-[10px] xs:text-xs sm:text-sm font-medium text-white transition hover:bg-[#082f73] active:scale-[0.98]"
                    >
                        <Plus className="h-3 w-3 xs:h-3.5 xs:w-3.5 shrink-0" />
                        <span className="truncate">Add Address</span>
                    </button>
                </div>
            </div>

            <div className="my-3 xs:my-4 sm:my-5 md:my-6 border-t border-gray-100" />

            {/* Default Badge */}
            {address.isDefault && (
                <div className="mb-3 xs:mb-4 flex">
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#0A3D91]/15 bg-[#0A3D91]/[0.07] px-2 py-0.5 xs:px-2.5 text-[9px] xs:text-[10px] sm:text-xs font-semibold tracking-wide text-[#0A3D91]">
                        <Check className="h-2.5 w-2.5 xs:h-3 xs:w-3" strokeWidth={2.5} />
                        Default
                    </span>
                </div>
            )}

            {/* Layout Box */}
            <div className="space-y-2.5 xs:space-y-3">
                {/* Name */}
                <div className="flex items-center gap-2.5 xs:gap-3">
                    <span className="flex h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[#0A3D91]/8">
                        <Home className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-[#0A3D91]" />
                    </span>

                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {address.fullName}
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-2 xs:gap-2.5 pl-9 xs:pl-10 sm:pl-11 md:pl-12">
                    {/* Mobile */}
                    <div className="flex items-center gap-1.5 xs:gap-2 text-[11px] xs:text-xs sm:text-sm text-gray-600">
                        <Phone className="h-3 w-3 xs:h-3.5 xs:w-3.5 text-gray-400 shrink-0" />
                        <span className="break-all">{address.mobile}</span>
                    </div>

                    {/* Address Detail text */}
                    <div className="flex items-start gap-1.5 xs:gap-2">
                        <MapPin className="h-3 w-3 xs:h-3.5 xs:w-3.5 mt-0.5 shrink-0 text-gray-400" />

                        <p className="text-[11px] xs:text-xs sm:text-sm md:text-base leading-relaxed text-gray-600 sm:leading-6 md:leading-7 break-words pr-1 xs:pr-2">
                            {[
                                address.houseNo,
                                address.building,
                                address.landmark,
                                address.city,
                                address.state,
                                address.postalCode,
                                address.country,
                            ]
                                .filter(Boolean)
                                .join(", ")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedAddressCard;