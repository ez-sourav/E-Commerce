
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import AddressForm from "./AddressForm";

const AddressModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialValues = null,
    loading = false,
}) => {
    
if (!isOpen) return null;
    return (
        <AnimatePresence>
            <motion.div
                className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-[2px]"
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
                    className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
                >
                    {/* Header */}
                    <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-5 py-4 sm:px-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                                {initialValues
                                    ? "Edit Address"
                                    : "Add New Address"}
                            </h2>
                            <p className="mt-0.5 text-xs text-gray-400 sm:text-sm">
                                {initialValues
                                    ? "Update your delivery details."
                                    : "Fill in your delivery details."}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/30"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="overflow-y-auto p-5 sm:p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
                        <AddressForm
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            loading={loading}
                            onCancel={onClose}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AddressModal;