import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
   <footer className="border-t border-gray-200 bg-white pt-12 pb-28 sm:pt-14 sm:pb-28 lg:pt-16 lg:pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-8">
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;