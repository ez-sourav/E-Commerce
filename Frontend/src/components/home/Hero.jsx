import {
    ArrowRight,
    ShieldCheck,
    RotateCcw,
    Headset,
} from "lucide-react";
import { MdOutlineLocalShipping } from 'react-icons/md'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Import images (keeping your imports)
import Laptop from '../../assets/images/hero/Laptop.png'
import Phone from '../../assets/images/hero/Phone.jpg'
import Shoes from '../../assets/images/hero/Shoes.avif'
import Watch from '../../assets/images/hero/Watch.png'
import Shirt from '../../assets/images/hero/Shirt.png'

const floatTransition = (duration) => ({
    duration,
    repeat: Infinity,
    ease: "easeInOut",
});

const trustItems = [
    { icon: MdOutlineLocalShipping, label: "Free Shipping" },
    { icon: ShieldCheck, label: "Secure Payments" },
    { icon: RotateCcw, label: "Easy Returns" },
    { icon: Headset, label: "24/7 Support" },
];

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-white to-gray-50/30">
            {/* Background Blur - Optimized for mobile */}
            <div className="absolute -top-24 right-0 h-40 w-40 rounded-full bg-blue-100 blur-3xl opacity-30 sm:h-56 sm:w-56 lg:-top-40 lg:h-125 lg:w-125"></div>
            <div className="absolute -bottom-20 left-0 h-36 w-36 rounded-full bg-gray-100 blur-3xl opacity-40 sm:h-48 sm:w-48 lg:-bottom-32 lg:h-87.5 lg:w-87.5"></div>

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:min-h-[80vh] lg:grid lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-12">

                {/* Right side - Images (Now first on mobile) */}
                <div className="relative order-1 h-80 w-full max-w-sm mx-auto sm:h-96 md:h-105 lg:order-2 lg:h-137.5 lg:max-w-none">

                    {/* Main floating image - Laptop */}
                    <motion.div
                        className="absolute left-1/2 top-1/2 z-20 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-1.5 shadow-2xl sm:p-2 lg:w-[78%]"
                        animate={{ y: [0, -10, 0] }}
                        transition={floatTransition(6)}
                    >
                        <img
                            src={Laptop}
                            alt="Laptop"
                            loading="lazy"
                            className="aspect-4/3 w-full rounded-xl object-cover"
                        />
                    </motion.div>

                    {/* Floating product images - Adjusted for mobile */}
                    <motion.div
                        className="absolute left-2 top-4 z-30 w-14 rounded-xl bg-white p-1 shadow-lg sm:left-4 sm:top-6 sm:w-20 lg:left-6 lg:top-8 lg:w-28"
                        animate={{ y: [0, -8, 0] }}
                        transition={floatTransition(5)}
                    >
                        <img
                            src={Shirt}
                            alt="Shirt"
                            loading="lazy"
                            className="aspect-square rounded-lg object-cover"
                        />
                    </motion.div>

                    <motion.div
                        className="absolute right-2 top-6 z-30 w-14 rounded-xl bg-white p-1 shadow-lg sm:right-4 sm:top-8 sm:w-20 lg:right-6 lg:top-10 lg:w-28"
                        animate={{ y: [0, 10, 0] }}
                        transition={floatTransition(7)}
                    >
                        <img
                            src={Phone}
                            alt="Phone"
                            loading="lazy"
                            className="aspect-square rounded-lg object-cover"
                        />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-10 left-2 z-30 w-14 rounded-xl bg-white p-1 shadow-lg sm:bottom-14 sm:left-4 sm:w-20 lg:bottom-16 lg:left-6 lg:w-28"
                        animate={{ y: [0, -10, 0] }}
                        transition={floatTransition(8)}
                    >
                        <img
                            src={Shoes}
                            alt="Shoes"
                            loading="lazy"
                            className="aspect-square rounded-lg object-cover"
                        />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-8 right-2 z-30 w-14 rounded-xl bg-white p-1 shadow-lg sm:bottom-12 sm:right-4 sm:w-20 lg:bottom-14 lg:right-6 lg:w-28"
                        animate={{ y: [0, -12, 0] }}
                        transition={floatTransition(5)}
                    >
                        <img
                            src={Watch}
                            alt="Watch"
                            loading="lazy"
                            className="aspect-square rounded-lg object-cover"
                        />
                    </motion.div>
                </div>

                {/* Left side - Content (Now second on mobile) */}
                <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-2 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:mt-8 lg:text-6xl"
                    >
                        Everything You Need,{' '}
                        <span className="italic text-[#0A3D91]">
                            All in One Place.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-600 sm:mt-6 sm:text-base lg:mx-0 lg:text-lg"
                    >
                        Shop the latest electronics, fashion, footwear, home essentials,
                        and everyday accessories with premium quality, secure payments,
                        and fast delivery.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start"
                    >
                        <Link
                            to="/shop"
                            className="group flex items-center justify-center gap-2 rounded-full bg-[#0A3D91] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0A3D91]/90 hover:shadow-lg active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                        >
                            Shop Now
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 sm:size-4.5" />
                        </Link>

                        <button
                            onClick={() =>
                                document
                                    .getElementById("categories")
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                    })
                            }
                            className="rounded-full border border-gray-300 bg-white/80 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-95 backdrop-blur-sm sm:px-8 sm:py-4 sm:text-base"
                        >
                            Browse Categories
                        </button>
                    </motion.div>

                    <div className="mt-6 pt-6 sm:mt-8 sm:pt-10">
                        <div className="mb-6 h-px bg-linear-to-r from-transparent via-gray-300/70 to-transparent sm:mb-8" />

                        {/* Trust Items - Responsive grid */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                            {trustItems.map(({ icon: Icon, label }) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col items-center gap-1.5 text-center lg:items-start lg:text-left"
                                >
                                    <Icon
                                        className="text-[#0A3D91]"
                                        size={20}
                                    />
                                    <span className="text-[10px] font-semibold text-gray-700 sm:text-xs lg:text-sm">
                                        {label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;