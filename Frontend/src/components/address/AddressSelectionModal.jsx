
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
                className="fixed top-0 left-0 w-screen h-dvh z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-[2px]"
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
                    <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-5 py-4 sm:px-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                                Choose Delivery Address
                            </h2>
                            <p className="mt-0.5 text-xs text-gray-400 sm:text-sm">
                                Select where you'd like your order delivered.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/30"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 space-y-3 overflow-y-auto p-5 sm:p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                        {addresses.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-10 text-center">
                                <p className="text-sm text-gray-500">
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
                                    className={`cursor-pointer rounded-2xl transition ${
                                        selectedAddressId === address._id
                                            ? "ring-2 ring-[#0A3D91]"
                                            : "ring-1 ring-transparent hover:ring-gray-200"
                                    }`}
                                >
                                    <div className="flex items-center gap-3 px-4 pt-4">
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
                                            className="h-4 w-4 accent-[#0A3D91]"
                                        />

                                        <span className="text-sm font-medium text-gray-700">
                                            Deliver to this address
                                        </span>
                                    </div>

                                    <div className="p-4 pt-2">
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
                    <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <button
                            onClick={onAddAddress}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 order-3 sm:order-1"
                        >
                            <Plus size={18} />
                            Add Address
                        </button>

                        <div className="flex gap-3 order-1 sm:order-2">
                            <button
                                onClick={onClose}
                                className="flex-1 rounded-lg border border-gray-200 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 sm:flex-none"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={onConfirm}
                                className="flex-1 rounded-lg bg-[#0A3D91] px-6 py-2.5 font-medium text-white transition hover:bg-[#082f73] sm:flex-none"
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