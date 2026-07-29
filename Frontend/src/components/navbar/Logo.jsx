import { NavLink } from "react-router-dom";

const Logo = ({ compact = false }) => {
    return (
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
};


export default Logo;