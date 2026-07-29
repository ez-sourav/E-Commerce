import { NavLink, useNavigate } from "react-router-dom";
import {
    Search,
    Heart,
    ShoppingCart,
    ChevronDown,
    LogOut,
    UserCircle,
} from "lucide-react";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { DESKTOP_LINKS } from "./constants";
import { desktopLinkClass, getInitials } from "./utils";

const DesktopNavbar = ({
    isScrolled,
    searchProps,
    user,
    isAuthenticated,
    cartCount,
    isDropdownOpen,
    setIsDropdownOpen,
    dropdownRef,
    handleLogout,
}) => {
    return (
        <header
            className={`sticky top-0 z-50 hidden border-b border-gray-100 bg-white/95 backdrop-blur transition-shadow duration-300 lg:block ${isScrolled
                ? "shadow-[0_2px_16px_-4px_rgba(15,23,42,0.08)]"
                : ""
                }`}
        >
            <div className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 lg:px-8">
                {/* Logo */}
                <Logo />

                {/* Navigation */}
                <nav
                    className="flex items-center justify-center gap-7 lg:gap-8"
                    aria-label="Primary"
                >
                    {DESKTOP_LINKS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={desktopLinkClass}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-5">
                    <SearchBar {...searchProps} />

                    {/* Mobile Search Button */}
                    <NavLink
                        to="/shop"
                        className="rounded-full p-2.5 text-gray-900 transition hover:bg-gray-100 hover:text-[#0A3D91] lg:hidden"
                        aria-label="Search"
                    >
                        <Search size={20} />
                    </NavLink>

                    {/* Wishlist
                    {isAuthenticated && (
                        <NavLink
                            to="/wishlist"
                            className="rounded-full p-2.5 text-gray-900 transition hover:bg-gray-100 hover:text-[#0A3D91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3D91]"
                            aria-label="Wishlist"
                        >
                            <Heart size={21} />
                        </NavLink>
                    )} */}

                    {/* Cart */}
                    <NavLink
                        to="/cart"
                        className="relative rounded-full p-2.5 text-gray-900 transition hover:bg-gray-100 hover:text-[#0A3D91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3D91]"
                        aria-label={`Cart, ${cartCount} items`}
                    >
                        <ShoppingCart size={21} />

                        {cartCount > 0 && (
                            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A3D91] text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </NavLink>

                    {/* Profile */}
                    <div
                        className="relative"
                        ref={dropdownRef}
                    >
                        {isAuthenticated ? (
                            <button
                                onClick={() =>
                                    setIsDropdownOpen((prev) => !prev)
                                }
                                className="flex items-center gap-1 rounded-full p-1 text-gray-900 transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3D91]"
                                aria-label="Account menu"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0A3D91] text-sm font-semibold text-white">
                                    {getInitials(user?.name)}
                                </div>

                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className="rounded-full bg-[#0A3D91] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0A356E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3D91]"
                            >
                                Login
                            </NavLink>
                        )}

                        {/* Dropdown Menu */}
                        {isAuthenticated && isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">

                                {/* User Info */}
                                <div className="flex items-center gap-3 p-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A3D91] text-lg font-semibold text-white">
                                        {getInitials(user?.name)}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-semibold text-gray-900">
                                            {user?.name || "User"}
                                        </h3>

                                        <p className="truncate text-sm text-gray-500">
                                            {user?.email || ""}
                                        </p>
                                    </div>

                                </div>

                                <div className="border-t border-gray-100" />

                                {/* My Account */}
                                <NavLink
                                    to="/profile"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center justify-between px-4 py-3 transition hover:bg-gray-50"
                                >

                                    <div className="flex items-center gap-3">
                                        <UserCircle
                                            size={19}
                                            className="text-gray-600"
                                        />

                                        <span className="font-medium text-gray-800">
                                            My Account
                                        </span>
                                    </div>

                                    <ChevronDown
                                        size={16}
                                        className="-rotate-90 text-gray-400"
                                    />

                                </NavLink>

                                {/* Wishlist */}
                                <NavLink
                                    to="/wishlist"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 transition hover:bg-gray-50"
                                >

                                    <Heart
                                        size={19}
                                        className="text-gray-600"
                                    />

                                    <span className="font-medium text-gray-800">
                                        Wishlist
                                    </span>

                                </NavLink>

                                <div className="border-t border-gray-100" />

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition hover:bg-red-50"
                                >

                                    <LogOut size={18} />

                                    <span className="font-medium">
                                        Logout
                                    </span>

                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DesktopNavbar;