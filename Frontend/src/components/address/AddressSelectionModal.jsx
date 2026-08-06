import { AnimatePresence, motion } from "framer-motion";
import { X, Plus } from "lucide-react";

import AddressCard from "./AddressCard";

const AddressSelectionModal = ({
    isOpen,
    onClose,
    addresses = [],
    selectedAddressId,
    setSelectedAddressId,
    onConfirm,
    onAddAddress,
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                
                className="fixed top-0 left-0 w-screen h-dvh z-50 flex items-center justify-center bg-gray-900/50 p-3 xs:p-4 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.97, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: 20 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
                >
                    {/* Header */}
                    <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 py-3.5 xs:px-5 xs:py-4 sm:px-6">
                        <div className="min-w-0">
                            <h2 className="text-base xs:text-lg font-semibold text-gray-900 sm:text-xl truncate">
                                Choose Delivery Address
                            </h2>
                            <p className="mt-0.5 text-[10px] xs:text-xs text-gray-400 sm:text-sm truncate">
                                Select where you'd like your order delivered.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-1.5 xs:p-2 text-gray-500 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/30 shrink-0"
                        >
                            <X className="h-4 w-4 xs:h-5 xs:w-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 space-y-3 overflow-y-auto p-4 xs:p-5 sm:p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                        {addresses.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-8 xs:p-10 text-center">
                                <p className="text-xs xs:text-sm text-gray-500">
                                    No saved addresses found.
                                </p>
                            </div>
                        ) : (
                            addresses.map((address) => (
                                <div
                                    key={address._id}
                                    onClick={() =>
                                        setSelectedAddressId(address._id)
                                    }
                                    className={`cursor-pointer rounded-xl xs:rounded-2xl transition ${
                                        selectedAddressId === address._id
                                            ? "ring-2 ring-[#0A3D91]"
                                            : "ring-1 ring-gray-100 hover:ring-gray-200"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 px-3 pt-3 xs:px-4 xs:pt-4">
                                        <input
                                            type="radio"
                                            checked={
                                                selectedAddressId ===
                                                address._id
                                            }
                                            onChange={() =>
                                                setSelectedAddressId(
                                                    address._id
                                                )
                                            }
                                            className="h-3.5 w-3.5 xs:h-4 xs:w-4 accent-[#0A3D91] shrink-0"
                                        />

                                        <span className="text-xs xs:text-sm font-medium text-gray-700 select-none">
                                            Deliver to this address
                                        </span>
                                    </div>

                                    <div className="p-3 pt-1 xs:p-4 xs:pt-2">
                                        <AddressCard
                                            address={address}
                                            showActions={false}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-2.5 border-t border-gray-100 p-4 xs:p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 bg-white shrink-0">
                        <button
                            onClick={onAddAddress}
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg border bg-gray-50 border-gray-200 px-4 py-2 xs:py-2.5 text-xs xs:text-sm font-medium  transition hover:bg-gray-100 order-3 sm:order-1"
                        >
                            <Plus className="h-3.5 w-3.5 xs:h-4 xs:w-4 shrink-0" />
                            <span>Add Address</span>
                        </button>

                        <div className="flex gap-2 order-1 sm:order-2 w-full sm:w-auto">
                            <button
                                onClick={onClose}
                                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 xs:py-2.5 text-xs xs:text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:flex-none"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={onConfirm}
                                className="flex-1 rounded-lg bg-[#0A3D91] px-4 py-2 xs:py-2.5 text-xs xs:text-sm font-medium text-white transition hover:bg-[#082f73] sm:flex-none"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AddressSelectionModal;
