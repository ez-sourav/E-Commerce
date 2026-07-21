import { Mail, MapPin } from "lucide-react";
import { contactInfo } from "./footerData";

const FooterContact = () => {
  return (
    <div className="text-center sm:text-left">
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-900">
        Contact
      </h3>

      <ul className="space-y-4">
        <li className="flex items-center justify-center gap-3 sm:justify-start">
          <Mail
            size={18}
            className="shrink-0 text-[#0A3D91]"
          />

          <a
            href={`mailto:${contactInfo.email}`}
            className="wrap-break-word rounded-sm text-gray-600 transition-colors duration-300 hover:text-[#0A3D91] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3D91] focus-visible:ring-offset-2"
          >
            {contactInfo.email}
          </a>
        </li>

        <li className="flex items-center justify-center gap-3 sm:justify-start">
          <MapPin
            size={18}
            className="shrink-0 text-[#0A3D91]"
          />

          <span className="text-gray-600">
            {contactInfo.location}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default FooterContact;