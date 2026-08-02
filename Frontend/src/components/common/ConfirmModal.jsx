import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({
    isOpen,
    title = "Confirm Action",
    message = "Are you sure?",
    confirmText = "Delete",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onCancel}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md rounded-2xl bg-white shadow-xl"
                >
                    <div className="p-6">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle
                                size={28}
                                className="text-red-600"
                            />
                        </div>

                        <h2 className="text-center text-xl font-semibold">
                            {title}
                        </h2>

                        <p className="mt-3 text-center text-gray-500">
                            {message}
                        </p>

                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={onCancel}
                                disabled={loading}
                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-medium hover:bg-gray-100"
                            >
                                {cancelText}
                            </button>

                            <button
                                onClick={onConfirm}
                                disabled={loading}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white hover:bg-red-700 disabled:opacity-60"
                            >
                                {loading ? "Deleting..." : confirmText}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ConfirmModal;