import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BRAND = "#0A3D91";

function ShoppingBagIllustration() {
  return (
    <svg
      viewBox="0 0 220 220"
      className="h-36 w-36 sm:h-40 sm:w-40 md:h-42 md:w-42 lg:h-44 lg:w-44"
      role="img"
      aria-label="Empty shopping bag illustration"
    >
      <defs>
        <linearGradient id="bagFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EEF3FC" />
          <stop offset="100%" stopColor="#E4ECFA" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse
        cx="110"
        cy="188"
        rx="52"
        ry="8"
        fill="#0A3D91"
        opacity="0.06"
      />

      {/* Handle */}
      <path
        d="M78 74V56a32 32 0 0 1 64 0v18"
        fill="none"
        stroke={BRAND}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Bag */}
      <path
        d="M56 74h108l8 96a10 10 0 0 1-10 11H58a10 10 0 0 1-10-11l8-96Z"
        fill="url(#bagFill)"
        stroke={BRAND}
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Top Fold */}
      <path
        d="M56 74h108"
        stroke={BRAND}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Question Mark */}
      <text
        x="110"
        y="140"
        textAnchor="middle"
        fontSize="46"
        fontWeight="700"
        fill={BRAND}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        ?
      </text>
    </svg>
  );
}

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 py-4 sm:px-6 sm:py-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex w-full max-w-135 flex-col items-center text-center"
      >

        <Link
          to="/"
          aria-label="Trendify Home"
          className="mb-5 inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-90"
        >
          <img
            src="/bag-logo2.png"
            alt="Trendify Logo"
            className="h-12 w-12 select-none object-contain sm:h-16 sm:w-16"
            draggable={false}
          />

          <span className="text-3xl font-bold tracking-tight text-[#0A3D91] sm:text-[38px]">
            Trendify
          </span>
        </Link>


        <motion.div
          className="mb-5"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ShoppingBagIllustration />
        </motion.div>

        <h1 className="text-6xl font-extrabold tracking-tight text-[#0A3D91] sm:text-7xl lg:text-7xl">
          404
        </h1>

        <h2 className="mt-3 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          We couldn't find the page you're looking for. It may have been moved,
          deleted, or the URL might be incorrect.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
          className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#0A3D91] px-7 text-sm font-semibold text-white shadow-md shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/20"
          >
            Back to Home
          </Link>

          <Link
            to="/shop"
            className="inline-flex h-11 items-center justify-center rounded-full border-2 border-[#0A3D91] px-7 text-sm font-semibold text-[#0A3D91] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0A3D91] hover:text-white"
          >
            Go to Shop
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.45,
            duration: 0.5,
          }}
          className="mt-5 text-xs text-gray-400 sm:text-sm"
        >
          Return to the homepage and continue exploring Trendify.
        </motion.p>
      </motion.div>
    </main>
  );
}