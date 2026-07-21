import { NavLink } from "react-router-dom";
import { socialLinks } from "./footerData";

import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const iconMap = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  Facebook: FaFacebook,
};

const FooterBrand = () => {
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <NavLink
        to="/"
        className="flex items-center gap-0.5 transition-opacity hover:opacity-90"
      >
        <img
          src="/bag-logo2.png"
          alt="Trendify Logo"
          className="h-8 w-8 object-contain"
        />

        <span className="text-2xl font-bold tracking-tight text-[#0A3D91]">
          Trendify
        </span>
      </NavLink>

      <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
       Discover premium fashion, electronics, and everyday essentials in one place.
      </p>

      <div className="mt-5 flex items-center gap-3">
        {socialLinks.map((social) => {
          const Icon = iconMap[social.name];

          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-[#0A3D91] hover:bg-[#0A3D91] hover:text-white sm:h-10 sm:w-10"
            >
              <Icon className="text-[16px] sm:text-[18px]" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FooterBrand;