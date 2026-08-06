import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ChevronRight,
  LogOut,
  Package2,
  Heart as HeartIcon,
  UserRound
} from "lucide-react";
import { motion } from "framer-motion";

import useAuth from "../hooks/useAuth";
import { useAddress } from "../context/AddressContext";
import useWishlist from "../hooks/useWishlist";
import { getOrders } from "../services/orderService";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

const Profile = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { addresses } = useAddress();
  const { wishlist } = useWishlist();

  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrdersCount(data.orders.length);
      } catch {
        setOrdersCount(0);
      }
    };

    fetchOrders();
  }, []);

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    })
    : "N/A";

  const menuItems = [
    {
      title: "My Orders",
      description: "Track, return, or buy things again.",
      icon: Package2,
      path: "/orders",
    },
    {
      title: "Wishlist",
      description: "Save items you love for later.",
      icon: HeartIcon,
      path: "/wishlist",
    },
    {
      title: "Manage Addresses",
      description: "Edit delivery and billing details.",
      icon: MapPin,
      path: "/addresses",
    },
  ];

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
    : "U";

  return (
    
    <div className="bg-[#F9FAFB] py-6  sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid gap-6 md:grid-cols-12">

          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="md:col-span-4 lg:col-span-3"
          >
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center border-b border-gray-100 pb-5">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#dae2ff] text-4xl font-bold text-[#0A3D91] ring-4 ring-white ring-offset-2">
                    {initials}
                  </div>
                </div>

                <h2 className="mt-4 text-2xl font-semibold text-gray-900 text-center break-all px-2">
                  {user?.name || "User"}
                </h2>

                <p className="mt-1 text-sm text-gray-500 text-center break-all px-2">
                  {user?.email || "No Email"}
                </p>
              </div>

              <div className="space-y-5 py-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-500 shrink-0">
                    Member Since
                  </span>
                  <span className="font-semibold text-gray-900 text-sm xs:text-base text-right truncate">
                    {joinedDate}
                  </span>
                </div>

                <div className="border-t border-gray-100" />

                <div className="grid grid-cols-3 gap-1 xs:gap-3 text-center">
                  <div>
                    <p className="text-lg xs:text-xl font-bold text-[#0A3D91]">
                      {ordersCount}
                    </p>
                    <p className="text-[10px] xs:text-xs text-gray-500">
                      Orders
                    </p>
                  </div>

                  <div>
                    <p className="text-lg xs:text-xl font-bold text-red-500">
                      {wishlist.length}
                    </p>
                    <p className="text-[10px] xs:text-xs text-gray-500">
                      Wishlist
                    </p>
                  </div>

                  <div>
                    <p className="text-lg xs:text-xl font-bold text-[#762900]">
                      {addresses.length}
                    </p>
                    <p className="text-[10px] xs:text-xs text-gray-500">
                      Address
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-[0.98]"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Logout</span>
              </button>

            </div>
          </motion.aside>

          {/* Right Content */}
          <section className="space-y-6 md:col-span-8 lg:col-span-9">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4 xs:gap-6 lg:grid-cols-2"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="group flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-4 xs:p-6 text-left shadow-sm transition-all duration-300 hover:cursor-pointer hover:border-[#0A3D91]/30 hover:shadow-lg"
                  >
                    <div className="flex gap-3 xs:gap-4 max-w-[85%]">
                      <div className="flex h-11 w-11 xs:h-14 xs:w-14 shrink-0 items-center justify-center rounded-xl xs:rounded-2xl bg-[#0A3D91]/10 transition-colors duration-300">
                        <Icon
                          className="h-5 w-5 xs:h-7 xs:w-7 text-[#0A3D91] transition-colors duration-300 shrink-0"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base xs:text-lg font-semibold text-gray-900 truncate">
                          {item.title}
                        </h3>

                        <p className="mt-0.5 xs:mt-1 text-xs xs:text-sm leading-normal xs:leading-6 text-gray-500 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      className="h-4 w-4 xs:h-5 xs:w-5 mt-1 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0A3D91] shrink-0"
                    />
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-[#0A3D91]/10 bg-linear-to-r from-[#0A3D91] to-[#144296] p-5 xs:p-6 text-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                <UserRound
                  className="h-5 w-5 text-blue-100 shrink-0"
                />

                <h2 className="text-lg xs:text-xl font-semibold truncate">
                  Welcome back, {user?.name?.split(" ")[0] || "User"}
                </h2>
              </div>

              <p className="mt-1.5 xs:mt-2 max-w-2xl text-xs xs:text-sm leading-relaxed xs:leading-6 text-blue-100">
                Manage your orders, saved products and delivery addresses from one
                place. Thanks for shopping with Trendify.
              </p>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
