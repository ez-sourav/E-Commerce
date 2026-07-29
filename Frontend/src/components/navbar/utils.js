export const desktopLinkClass = ({ isActive }) =>
  `relative px-1 py-1.5 text-[15px] transition-colors duration-300
   after:absolute after:left-2 after:right-2 after:-bottom-[1px]
   after:h-[2px] after:rounded-full after:bg-[#0A3D91]
   after:origin-left after:transition-transform after:duration-300
   after:ease-out
   ${
     isActive
       ? "text-[#0A3D91] font-extrabold after:scale-x-100"
       : "text-black font-medium hover:text-[#0A3D91] after:scale-x-0 hover:after:scale-x-100"
   }`;
export const getInitials = (name) => {
  if (!name) return "U";

  return name
    .trim()
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};