import { MapPin, Plus } from "lucide-react";
import { motion } from "framer-motion";

const EmptyManageAddress = ({ onAddAddress }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-14 text-center sm:py-20"
        >
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0A3D91]/10 sm:h-20 sm:w-20"
            >
                <MapPin
                    size={32}
                    className="text-[#0A3D91] sm:hidden"
                />
                <MapPin
                    size={36}
                    className="hidden text-[#0A3D91] sm:block"
                />
            </motion.div>

            <h2 className="mt-6 text-xl font-semibold text-gray-900 sm:text-2xl">
                No Addresses Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-gray-500 sm:text-base">
                Add your first delivery address to make checkout faster
                and easier for future orders.
            </p>

            <button
                onClick={onAddAddress}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0A3D91] px-6 py-3 font-medium text-white transition-all duration-150 hover:bg-[#083170] active:scale-[0.98]"
            >
                <Plus size={18} />
                Add Address
            </button>
        </motion.div>
    );
};

export default EmptyManageAddress;