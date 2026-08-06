import { NavLink } from "react-router-dom";

import {
  AUTH_BOTTOM_TABS,
  GUEST_BOTTOM_TABS,
} from "./constants";

import { getInitials } from "./utils";

const MobileBottomNav = ({
  user,
  isAuthenticated,
}) => {
  const BOTTOM_TABS = isAuthenticated
    ? AUTH_BOTTOM_TABS
    : GUEST_BOTTOM_TABS;

  return (
    <nav
      aria-label="Bottom navigation"
      
      className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-gray-100 bg-white h-16 pb-[env(safe-area-inset-bottom)] box-content shadow-[0_-4px_20px_-6px_rgba(15,23,42,0.12)] lg:hidden"
    >
      <div className="mx-auto flex h-full max-w-md items-stretch justify-between px-1">
        {BOTTOM_TABS.map(({ to, label, icon: Icon, end, badge }) => {
          const actualPath =
            (to === "/profile" || to === "/wishlist") && !isAuthenticated
              ? "/login"
              : to;

          return (
            <NavLink
              key={to}
              to={actualPath}
              end={end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center gap-0.5 py-1 text-[10px] xs:text-[11px] transition-colors select-none min-w-0 ${
                  isActive
                    ? "text-[#0A3D91] font-bold"
                    : "text-gray-500 font-medium"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative flex items-center justify-center h-6 w-6">
                    {to === "/profile" && isAuthenticated ? (
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full bg-[#0A3D91] text-[9px] font-bold text-white transition-transform ${
                          isActive
                            ? "scale-110 ring-2 ring-[#0A3D91] ring-offset-1"
                            : ""
                        }`}
                      >
                        {getInitials(user?.name) || "U"}
                      </div>
                    ) : (
                      <Icon
                        className={`h-5 w-5 xs:h-[22px] xs:w-[22px] shrink-0 transition-transform duration-200 ${
                          isActive
                            ? "text-[#0A3D91] scale-105"
                            : "text-gray-500"
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    )}

                    {badge > 0 && (
                      <span className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-extrabold text-white ring-1 ring-white shadow-xs">
                        {badge > 9 ? "9+" : badge}
                      </span>
                    )}
                  </span>

                  <span className="truncate w-full text-center px-0.5 leading-none mt-0.5">
                    {label}
                  </span>

                  <span
                    className={`h-0.5 w-2 rounded-full transition-all duration-200 mt-0.5 ${
                      isActive
                        ? "bg-[#0A3D91] opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
