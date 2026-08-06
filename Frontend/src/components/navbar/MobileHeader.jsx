import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import Logo from "./Logo";
import SearchBar from "./SearchBar";

const MobileHeader = ({
    isScrolled,
    cartCount,
    searchProps,
}) => {
    return (
        <header
            className={`sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur transition-shadow duration-300 lg:hidden ${isScrolled
                    ? "shadow-[0_2px_16px_-4px_rgba(15,23,42,0.08)]"
                    : ""
                }`}
        >
            <div className="flex h-14 xs:h-16 items-center justify-between gap-3 px-4 sm:h-17 sm:px-5">
                <Logo />

                <div className="flex items-center gap-1">
                    <NavLink
                        to="/cart"
                        className="relative rounded-full p-2 text-gray-900 transition hover:bg-gray-100 hover:text-[#0A3D91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3D91] select-none"
                        aria-label={`Cart, ${cartCount} items`}
                    >

                        <ShoppingCart className="h-5 w-5 xs:h-[21px] xs:w-[21px] shrink-0" />

                        {cartCount > 0 && (
                         
                            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A3D91] text-[9px] font-extrabold text-white ring-1 ring-white shadow-xs">
                                {cartCount > 9 ? "9+" : cartCount}
                            </span>
                        )}
                    </NavLink>
                </div>
            </div>

           
            <div className="px-4 pb-3 sm:px-5">
                <SearchBar
                    mobile
                    {...searchProps}
                />
            </div>
        </header>
    );
};

export default MobileHeader;
