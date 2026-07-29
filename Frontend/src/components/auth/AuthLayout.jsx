import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#fdf8f6]">
            {/* Ambient Background */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#0A3D91]/6 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 -right-16 h-64 w-64 rounded-full bg-amber-200/20 blur-3xl" />

            {/* Mobile Header */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.45,
                    ease: "easeOut",
                }}
                className="relative z-10 flex items-center justify-center border-b border-gray-200/70 bg-white/30px-5 py-4 backdrop-blur-sm lg:hidden"
            >
                <Link
                    to="/"
                    className="flex items-center gap-2 transition-opacity hover:opacity-90"
                >
                    <img
                        src="/bag-logo2.png"
                        alt="Trendify"
                        className="h-10 w-10"
                    />

                    <span className="text-3xl font-bold tracking-tight text-[#0A3D91]">
                        Trendify
                    </span>
                </Link>
            </motion.div>
            {/* Main */}
            <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-8 sm:py-10">
                <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">

                    {/* === LEFT SIDE ==== */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="hidden flex-col justify-center lg:flex"
                    >
                        <Link
                            to="/"
                            className="mb-6 flex w-fit items-center gap-2.5"
                        >
                            <img
                                src="/bag-logo2.png"
                                alt="Trendify"
                                className="h-10 w-10"
                            />

                            <span className="text-3xl font-extrabold tracking-tight text-[#0A3D91]">
                                Trendify
                            </span>
                        </Link>

                        <h1 className="max-w-md text-4xl font-bold leading-tight text-gray-900">
                            Elevate your everyday style.
                        </h1>

                        <p className="mt-4 max-w-md text-base leading-7 text-gray-600">
                            Discover curated collections from emerging designers and
                            premium brands — shop modern fashion with a seamless
                            experience.
                        </p>

                        <div className="mt-6 max-w-md overflow-hidden rounded-2xl shadow-lg shadow-gray-900/10">
                            <img
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
                                alt="Trendify fashion collection"
                                className="h-[290px] w-full object-cover xl:h-[320px]"
                            />
                        </div>
                    </motion.div>

                    {/* ==== RIGHT SIDE ==== */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.15,
                            ease: "easeOut",
                        }}
                        className="mx-auto w-full max-w-[470px] lg:mx-0"
                    >
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-900/5 sm:p-8 md:p-9">
                            <div className="text-center lg:text-left">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {title}
                                </h2>

                                <p className="mt-1.5 text-sm text-gray-500">
                                    {subtitle}
                                </p>
                            </div>

                            <div className="mt-7">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-200/70 bg-white/30 backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()}{" "}
                        <span className="font-medium text-[#0A3D91]">
                            Trendify
                        </span>
                        . All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default AuthLayout;