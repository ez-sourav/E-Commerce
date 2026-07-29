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
      className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-gray-100 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_-6px_rgba(15,23,42,0.12)] lg:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between">
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
                `flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] transition-colors ${
                  isActive
                    ? "text-[#0A3D91] font-extrabold"
                    : "text-gray-500 hover:text-[#0A3D91] font-semibold"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    {to === "/profile" && isAuthenticated ? (
                      <div
                        className={`flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[#0A3D91] text-[10px] font-semibold text-white ${
                          isActive
                            ? "ring-2 ring-[#0A3D91] ring-offset-2"
                            : ""
                        }`}
                      >
                        {getInitials(user?.name)}
                      </div>
                    ) : (
                      <Icon
                        size={22}
                        strokeWidth={isActive ? 2.4 : 2}
                        className={
                          isActive
                            ? "text-[#0A3D91]"
                            : "text-gray-500"
                        }
                      />
                    )}

                    {badge && (
                      <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A3D91] text-[9px] font-bold text-white">
                        {badge}
                      </span>
                    )}
                  </span>

                  <span>{label}</span>

                  <span
                    className={`h-1 w-1 rounded-full transition-opacity ${
                      isActive
                        ? "bg-[#0A3D91] opacity-100"
                        : "opacity-0"
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