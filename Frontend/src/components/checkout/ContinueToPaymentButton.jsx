import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
            },
        });
    };

    return (
        <button
            type="button"
            onClick={handleContinue}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:scale-[0.98] sm:py-4 sm:text-base ${
                selectedAddressId
                    ? "bg-black text-white hover:cursor-pointer hover:bg-gray-900"
                    : "bg-gray-900/90 text-white/90 hover:bg-gray-900"
            }`}
        >
            Continue to Payment
            <ArrowRight size={20} className="shrink-0" />
        </button>
    );
};

export default ContinueToPaymentButton;