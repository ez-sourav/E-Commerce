import { ArrowUp, ShieldCheck } from "lucide-react";

const FooterBottom = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="mt-8 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                {/* Left */}
                <div>
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Trendify. All rights reserved.
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Designed & Developed by{" "}
                        <span className="font-medium text-[#0A3D91]">
                            Sourav Biswas
                        </span>
                    </p>
                </div>

                <div className="flex flex-col items-center gap-3 sm:flex-row">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <ShieldCheck size={16} className="text-[#0A3D91]" />
                        <span>Secure Payments Powered by Stripe.</span>
                    </div>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-[#0A3D91] hover:bg-[#0A3D91] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D91] focus-visible:ring-offset-2"
                    >
                        <ArrowUp size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;