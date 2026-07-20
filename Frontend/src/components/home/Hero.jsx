import {
    ArrowRight,
    ShieldCheck,
    RotateCcw,
    Headset,

} from "lucide-react";
import { MdOutlineLocalShipping } from 'react-icons/md'

import { motion } from "framer-motion";
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

        <section className="relative overflow-hiddenbg-gradient-to-b from-white to-gray-50">
            {/* Background Blur */}
            <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-blue-100 blur-3xl opacity-40 sm:h-80 sm:w-80 lg:-top-40 lg:h-125 lg:w-125"></div>
            <div className="absolute -bottom-20 left-0 h-48 w-48 rounded-full bg-gray-100 blur-3xl opacity-50 sm:h-64 sm:w-64 lg:-bottom-32 lg:h-87.5 lg:w-87.5"></div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 py-10 sm:px-6 sm:py-16 lg:min-h-[80vh] lg:grid-cols-2 lg:gap-14 lg:py-12">

                {/* Left side */}
                <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
                    <h1 className="mt-2 text-4xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:mt-8 lg:text-6xl">
                        Everything You Need, <span className="italic text-[#0A3D91]">
                            All in One Place.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg lg:mx-0">
                        Shop the latest electronics, fashion, footwear, home essentials,
                        and everyday accessories with premium quality, secure payments,
                        and fast delivery.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
                        <button className="flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-105 active:scale-95">
                            Shop Now
                            <ArrowRight size={18} />
                        </button>

                        <button className="rounded-full border border-gray-300 px-8 py-4 font-semibold transition hover:bg-gray-100 active:scale-95">
                            Browse Categories
                        </button>
                    </div>

                    <div className="mt-2 pt-8 sm:mt-2 sm:pt-10">

                        <div className="mb-8 h-px bg-linear-to-r from-transparent via-gray-300/70 to-transparent" />

                        {/* Trust Items */}
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            {trustItems.map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left"
                                >
                                    <Icon
                                        className="text-[#0A3D91]"
                                        size={22}
                                    />

                                    <span className="text-xs font-semibold text-gray-900 sm:text-sm">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Right side */}
                <div className="relative order-1 h-105 w-full max-w-md mx-auto sm:h-130 md:h-140 lg:order-2 lg:h-162.5 lg:max-w-none">

                    <motion.div
                        className="absolute left-1/2 top-1/2 z-20 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-2 shadow-2xl sm:w-[78%] lg:w-[84%]"
                        animate={{ y: [0, -10, 0] }}
                        transition={floatTransition(6)}
                    >
                        <img
                            src={Laptop}
                            alt="Laptop"
                            className="aspect-4/3 w-full rounded-2xl object-cover"
                        />
                    </motion.div>

                    <motion.div
                        className="absolute left-5 top-6 z-30 w-20 rounded-2xl bg-white p-2 shadow-xl sm:left-6 sm:top-8 sm:w-24 lg:left-8 lg:top-10 lg:w-32"
                        animate={{ y: [0, -8, 0] }}
                        transition={floatTransition(5)}
                    >
                        <img
                            src={Shirt}
                            alt="Shirt"
                            className="aspect-square rounded-xl object-cover"
                        />
                    </motion.div>

                    <motion.div
                        className="absolute right-5 top-8 z-30 w-20 rounded-2xl bg-white p-2 shadow-xl sm:w-24 lg:right-8 lg:top-10 lg:w-32"
                        animate={{ y: [0, 10, 0] }}
                        transition={floatTransition(7)}
                    >
                        <img
                            src={Phone}
                            alt="Phone"
                            className="aspect-square rounded-xl object-cover"
                        />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-14 left-5 z-30 w-20 rounded-2xl bg-white p-2 shadow-xl sm:bottom-16 sm:w-24 lg:bottom-20 lg:left-8 lg:w-32"
                        animate={{ y: [0, -10, 0] }}
                        transition={floatTransition(8)}
                    >
                        <img
                            src={Shoes}
                            alt="Shoes"
                            className="aspect-square rounded-xl object-cover"
                        />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-12 right-5 z-30 w-20 rounded-2xl bg-white p-2 shadow-xl sm:bottom-14 sm:w-24 lg:bottom-18 lg:right-8 lg:w-32"
                        animate={{ y: [0, -12, 0] }}
                        transition={floatTransition(5)}
                    >
                        <img
                            src={Watch}
                            alt="Watch"
                            className="aspect-square rounded-xl object-cover"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
