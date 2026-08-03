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

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: "easeOut",
        },
    },
};

const ManageAddressCard = ({
    address,
    onEdit,
    onDelete,
    onSetDefault,
    defaultLoading = false,
}) => {
    return (
        <motion.div
            layout
            variants={cardVariants}
            whileHover={{ y: -3 }}
            transition={{
                duration: 0.2,
                ease: "easeOut",
            }}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6"
        >
            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-3">

                {address.isDefault ? (
                    <motion.span
                        initial={{
                            scale: 0.9,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#0A3D91]/20 bg-[#0A3D91]/10 px-3 py-1 text-xs font-semibold text-[#0A3D91]"
                    >
                        <Check
                            size={13}
                            strokeWidth={2.5}
                        />
                        Default Address
                    </motion.span>
                ) : (
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Delivery Address
                    </span>
                )}

                {!address.isDefault && (
                    <button
                        onClick={() =>
                            onSetDefault(address._id)
                        }
                        disabled={defaultLoading}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0A3D91] px-3 py-1 text-xs font-medium text-white transition hover:bg-[#083170] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {defaultLoading ? (
                            <>
                                <Loader2
                                    size={12}
                                    className="animate-spin"
                                />
                                Updating
                            </>
                        ) : (
                            <>
                                <Check size={12} />
                                Set Default
                            </>
                        )}
                    </button>
                )}

            </div>

            {/* Name */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A3D91]/10">
                    <Home
                        size={18}
                        className="text-[#0A3D91]"
                    />
                </div>

                <h3 className="min-w-0 truncate text-[15px] font-semibold text-gray-900 sm:text-lg">
                    {address.fullName}
                </h3>
            </div>

            {/* Phone */}
            <div className="mt-4 flex items-center gap-2 pl-12 text-sm text-gray-600 sm:pl-13">
                <Phone
                    size={15}
                    className="shrink-0 text-gray-400"
                />

                <span>{address.mobile}</span>
            </div>

            {/* Address */}
            <div className="mt-3 flex items-start gap-2 pl-12 sm:pl-13">
                <MapPin
                    size={15}
                    className="mt-1 shrink-0 text-gray-400"
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
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-5">

                <button
                    onClick={() => onEdit(address)}
                    className="inline-flex items-center cursor-pointer gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-150 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.97]"
                >
                    <Pencil size={15} />
                    Edit
                </button>

                <button
                    onClick={() =>
                        onDelete(address._id)
                    }
                    className="inline-flex items-center cursor-pointer gap-2 rounded-lg border border-red-100 px-4 py-2 text-sm font-medium text-red-600 transition-all duration-150 hover:bg-red-50 active:scale-[0.97]"
                >
                    <Trash2 size={15} />
                    Delete
                </button>

            </div>
        </motion.div>
    );
};

export default ManageAddressCard;