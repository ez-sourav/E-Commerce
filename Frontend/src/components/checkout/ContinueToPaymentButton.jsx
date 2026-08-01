import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";
import { motion } from "framer-motion";

const ContinueToPaymentButton = ({
    selectedAddressId,
}) => {
    const navigate = useNavigate();

    const handleContinue = () => {
        if (!selectedAddressId) {
            toast.error("Please select a delivery address.");
            return;
        }

        navigate("/payment", {
            state: {
                addressId: selectedAddressId,
                 fromCheckout: true,
            },
        });
    };

    return (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        whileHover={selectedAddressId ? { scale: 1.02 } : {}}
        whileTap={selectedAddressId ? { scale: 0.98 } : {}}
    >
        <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedAddressId}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D91] focus-visible:ring-offset-2 sm:py-4 sm:text-base ${
                selectedAddressId
                    ? "bg-[#0A3D91] text-white shadow-sm hover:cursor-pointer hover:bg-[#08357d]"
                    : "cursor-not-allowed bg-[#0A3D91]/40 text-white/80"
            }`}
        >
            <span>Continue to Payment</span>

            <motion.span
                animate={
                    selectedAddressId
                        ? { x: [0, 4, 0] }
                        : {}
                }
                transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "easeInOut",
                }}
            >
                <ArrowRight
                    size={20}
                    className="shrink-0"
                />
            </motion.span>
        </button>
    </motion.div>
);
};

export default ContinueToPaymentButton;