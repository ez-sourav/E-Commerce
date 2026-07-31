import { MapPinPlus } from "lucide-react";
import { motion } from "framer-motion";

const EmptyAddress = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-[#F9FAFB] px-6 py-14 text-center sm:py-16"
        >
            <div className="mb-5 rounded-full bg-white p-5 shadow-sm ring-1 ring-[#0A3D91]/10">
                <MapPinPlus size={40} className="text-[#0A3D91]" />
            </div>

            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                No Addresses Yet
            </h2>

            <p className="mt-2 max-w-sm text-sm text-gray-500">
                You haven't added any delivery addresses yet.
                Add your first address to make checkout faster and
                easier.
            </p>
        </motion.div>
    );
};

export default EmptyAddress;