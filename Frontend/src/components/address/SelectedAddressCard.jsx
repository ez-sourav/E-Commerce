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
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center sm:p-10">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0A3D91]/8">
                    <MapPin size={30} className="text-[#0A3D91]" />
                </span>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    No Delivery Address Selected
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500">
                    Add a delivery address to continue checkout.
                </p>

                <button
                    onClick={onAddAddress}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0A3D91] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#082f73]"
                >
                    <Plus size={18} />
                    Add Address
                </button>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <MapPin size={19} className="text-[#0A3D91]" />

                        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                            Delivery Address
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                        Your selected delivery address.
                    </p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onChange}
                        className="inline-flex flex-1 items-center hover:cursor-pointer justify-center gap-1.5 rounded-lg border border-[#0A3D91]/25 px-4 py-2 text-sm font-medium text-[#0A3D91] transition hover:bg-[#0A3D91]/6 sm:flex-none"
                    >
                        <ChevronRight size={16} />
                        Change
                    </button>

                    <button
                        onClick={onAddAddress}
                        className="inline-flex flex-1 items-center hover:cursor-pointer justify-center gap-1.5 rounded-lg bg-[#0A3D91] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#082f73] sm:flex-none"
                    >
                        <Plus size={16} />
                        Add Address
                    </button>
                </div>
            </div>

            <div className="my-5 border-t border-gray-100 sm:my-6" />

            {/* Default Badge */}
            {address.isDefault && (
                <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-[#0A3D91]/15 bg-[#0A3D91]/[0.07] px-3 py-1 text-xs font-semibold tracking-wide text-[#0A3D91]">
                    <Check size={13} strokeWidth={2.5} />
                    Default
                </span>
            )}

            {/* Name */}
            <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A3D91]/8">
                    <Home size={16} className="text-[#0A3D91]" />
                </span>

                <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                    {address.fullName}
                </h3>
            </div>

            {/* Mobile */}
            <div className="mt-3 flex items-center gap-2 pl-12 text-sm text-gray-600">
                <Phone size={16} className="text-gray-400" />
                <span>{address.mobile}</span>
            </div>

            {/* Address */}
            <div className="mt-3 flex items-start gap-2 pl-12">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />

                <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
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
    );
};

export default SelectedAddressCard;