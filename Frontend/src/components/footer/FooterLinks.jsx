import { NavLink } from "react-router-dom";
import { shopLinks, supportLinks } from "./footerData";

const FooterLinks = () => {
  return (
    <div className="grid grid-cols-2 gap-8 md:contents">
     
      <div className="text-center sm:text-left">
        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900">
          Shop
        </h3>

        <ul className="space-y-2">
          {shopLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.path}
                className="inline-block rounded-sm text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-[#0A3D91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D91] focus-visible:ring-offset-2"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center sm:text-left">
        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900">
          Support
        </h3>

        <ul className="space-y-2">
          {supportLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.path}
                className="inline-block rounded-sm text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-[#0A3D91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D91] focus-visible:ring-offset-2"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterLinks;