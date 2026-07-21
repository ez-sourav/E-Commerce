import { NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  Heart,
  ShoppingCart,
  User,
  Home as HomeIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ---------- Shared brand bits ---------- */

const DESKTOP_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
];

const BOTTOM_TABS = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
];

const CART_COUNT = 2;

const Logo = ({ compact = false }) => (
  <NavLink
    to="/"
    className="flex shrink-0 items-center gap-0.5"
  >
    <img
      src="/bag-logo2.png"
      alt="Trendify Logo"
      className="h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-10 lg:w-10"
    />

    {!compact && (
      <span className="text-2xl font-bold tracking-tight leading-none text-[#0A3D91] sm:text-2xl lg:text-[28px]">
        Trendify
      </span>
    )}
  </NavLink>
);

const desktopLinkClass = ({ isActive }) =>
  `relative px-1 py-2 text-[15px]  transition-colors ${isActive
    ? "text-[#0A3D91] after:absolute font-extrabold after:-bottom-[1px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#0A3D91]"
    : "text-black hover:text-gray-900 font-medium"
  }`;


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const focusMobileSearch = () => {
    searchInputRef.current?.focus();
    searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* ============ DESKTOP / TABLET NAVBAR (md and up) ============ */}
      <header
        className={`sticky top-0 z-50 hidden border-b border-gray-100 bg-white/95 backdrop-blur transition-shadow duration-300 lg:block ${isScrolled ? "shadow-[0_2px_16px_-4px_rgba(15,23,42,0.08)]" : ""
          }`}
      >
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6 lg:px-8">
          {/* Left: logo */}
          <Logo />

          {/* Center: nav links */}
          <nav
            className="flex items-center justify-center gap-7 lg:gap-9"
            aria-label="Primary"
          >
            {DESKTOP_LINKS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={desktopLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: search + icons */}
          <div className="flex items-center gap-2 lg:gap-3">
            <label className="relative hidden lg:block w-80  xl:w-125">
              <span className="sr-only">Search products</span>
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search for Products and More"
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#0A3D91] focus:bg-white"
              />
            </label>

            <NavLink
              to="/shop"
              className="rounded-full p-2.5 text-gray-900 transition hover:bg-gray-100 hover:text-[#0A3D91] lg:hidden"
              aria-label="Search"
            >
              <Search size={20} />
            </NavLink>

            <NavLink
              to='/wishlist'
              className="rounded-full p-2.5 text-gray-900 transition hover:bg-gray-100 hover:text-[#0A3D91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3D91]"
              aria-label="Wishlist"
            >
              <Heart size={21} />
            </NavLink>

            <NavLink
              to='/cart'
              className="relative rounded-full p-2.5 text-gray-900 transition hover:bg-gray-100 hover:text-[#0A3D91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3D91]"
              aria-label={`Cart, ${CART_COUNT} items`}
            >
              <ShoppingCart size={21} />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A3D91] text-[10px] font-bold text-white">
                {CART_COUNT}
              </span>
            </NavLink>

            <NavLink
              to='/profile'
              className="rounded-full p-2.5 text-gray-900 transition hover:bg-gray-100 hover:text-[#0A3D91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3D91]"
              aria-label="Account"
            >
              <User size={22} />
            </NavLink>
          </div>
        </div>
      </header>

      {/* ============ MOBILE TOP HEADER (below md) ============ */}
      <header
        className={`sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur transition-shadow duration-300 lg:hidden ${isScrolled ? "shadow-[0_2px_16px_-4px_rgba(15,23,42,0.08)]" : ""
          }`}
      >
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:h-[68px] sm:px-5">
          <Logo />

          <div className="flex items-center gap-1">
            <NavLink
              to="/cart"
              className="relative rounded-full p-2 text-gray-900 transition hover:bg-gray-100 hover:text-[#0A3D91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3D91]"
              aria-label={`Cart, ${CART_COUNT} items`}
            >
              <ShoppingCart size={21} />
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A3D91] text-[10px] font-bold text-white">
                {CART_COUNT}
              </span>
            </NavLink>
          </div>
        </div>

        {/* Full-width search bar, always visible */}
        <div className="px-4 pb-3 sm:px-5">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-900"
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for Products and More"
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-900  focus:border-[#0A3D91] focus:bg-white "
            />
          </label>
        </div>
      </header>

      {/* ============ MOBILE BOTTOM TAB NAV (below md) ============ */}
      <nav
        aria-label="Bottom navigation"
        className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-gray-100 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_-6px_rgba(15,23,42,0.12)] lg:hidden"
      >
        <div className="mx-auto flex max-w-md items-stretch justify-between ">
          {BOTTOM_TABS.map(({ to, label, icon: Icon, end, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center gap-1  py-2.5  text-[11px]  transition-colors ${isActive ? "text-[#0A3D91] font-extrabold" : "text-gray-500 hover:text-[#0A3D91] font-semibold "
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.4 : 2}
                      className={isActive ? "text-[#0A3D91]" : "text-gray-500"}
                    />
                    {badge && (
                      <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A3D91] text-[9px] font-bold text-white">
                        {badge}
                      </span>
                    )}
                  </span>
                  <span>{label}</span>
                  <span
                    className={`h-1 w-1 rounded-full transition-opacity ${isActive ? "bg-[#0A3D91] opacity-100" : "opacity-0"
                      }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;