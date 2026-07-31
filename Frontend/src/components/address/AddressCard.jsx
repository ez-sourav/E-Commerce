import {
    MapPin,
    Phone,
    Home,
    Check,
    Pencil,
    Trash2,
    Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

const AddressCard = ({
    address,
    onEdit,
    onDelete,
    onMakeDefault,
    defaultLoading = false,
    showActions = true,
}) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ring-1 ring-transparent transition hover:shadow-md sm:p-6"
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                {address.isDefault ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0A3D91]/15 bg-[#0A3D91]/[0.07] px-3 py-1 text-xs font-semibold tracking-wide text-[#0A3D91]">
                        <Check size={13} strokeWidth={2.5} />
                        Default
                    </span>
                ) : (
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Delivery Address
                    </span>
                )}
            </div>

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
                <Phone size={15} className="shrink-0 text-gray-400" />
                <span>{address.mobile}</span>
            </div>

            {/* Address */}
            <div className="mt-3 flex items-start gap-2 pl-12">
                <MapPin
                    size={15}
                    className="mt-0.5 shrink-0 text-gray-400"
                />

                <p className="text-sm leading-6 text-gray-600">
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

            {/* Actions */}
            {showActions && (
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-5">
                    <button
                        onClick={() => onEdit(address)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/30"
                    >
                        <Pencil size={15} />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(address._id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3.5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                    >
                        <Trash2 size={15} />
                        Delete
                    </button>

                    {!address.isDefault && (
                        <button
                            onClick={() => onMakeDefault(address._id)}
                            disabled={defaultLoading}
                            className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-[#0A3D91] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#082f73] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {defaultLoading ? (
                                <>
                                    <Loader2
                                        size={15}
                                        className="animate-spin"
                                    />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Check size={15} />
                                    Make Default
                                </>
                            )}
                        </button>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default AddressCard;