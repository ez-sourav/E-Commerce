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
    <div className="bg-[#F9FAFB] py-6 sm:py-8">
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

                <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                  {user?.name || "User"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {user?.email || "No Email"}
                </p>
              </div>

              <div className="space-y-5 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Member Since
                  </span>

                  <span className="font-semibold text-gray-900">
                    {joinedDate}
                  </span>
                </div>

                <div className="border-t border-gray-100" />

                <div className="grid grid-cols-3 gap-3 text-center">

                  <div>
                    <p className="text-xl font-bold text-[#0A3D91]">
                      {ordersCount}
                    </p>

                    <p className="text-xs text-gray-500">
                      Orders
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-bold text-red-500">
                      {wishlist.length}
                    </p>

                    <p className="text-xs text-gray-500">
                      Wishlist
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-bold text-[#762900]">
                      {addresses.length}
                    </p>

                    <p className="text-xs text-gray-500">
                      Address
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout */}

              <button
                onClick={logout}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
          </motion.aside>

          {/* Right Content */}
          <section className="space-y-6 md:col-span-8 lg:col-span-9">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
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
                    className="group flex items-start justify-between rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:cursor-pointer hover:border-[#0A3D91]/30 hover:shadow-lg"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0A3D91]/10 transition-colors duration-300 ">
                        <Icon
                          size={28}
                          className="text-[#0A3D91] transition-colors duration-300 "
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={20}
                      className="mt-1 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0A3D91]"
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
              className="rounded-2xl border border-[#0A3D91]/10 bg-linear-to-r from-[#0A3D91] to-[#144296] p-6 text-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                <UserRound
                  size={22}
                  className="text-blue-100"
                />

                <h2 className="text-xl font-semibold">
                  Welcome back, {user?.name?.split(" ")[0]}
                </h2>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
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