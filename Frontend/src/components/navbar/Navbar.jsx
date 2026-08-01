import { useNavigate, useLocation } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";

import useProductSearch from "../../hooks/useProductSearch";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

import DesktopNavbar from "./DesktopNavbar";
import MobileHeader from "./MobileHeader";
import MobileBottomNav from "./MobileBottomNav";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const { search, setSearch, handleSearch, handleKeyDown } =
    useProductSearch();

  const { cart } = useCart();

  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const CART_COUNT = cart.length;

  const hideBottomNav = [
    "/checkout",
    "/payment",
    "/order-confirmation",
].includes(location.pathname);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = async () => {
    try {
      await logout();

      setIsDropdownOpen(false);

      toast.success("Logged out successfully");

      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <DesktopNavbar
        isScrolled={isScrolled}
        searchProps={{
          search,
          setSearch,
          handleSearch,
          handleKeyDown,
        }}
        user={user}
        isAuthenticated={isAuthenticated}
        cartCount={CART_COUNT}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        dropdownRef={dropdownRef}
        handleLogout={handleLogout}
      />

      <MobileHeader
        isScrolled={isScrolled}
        cartCount={CART_COUNT}
        searchProps={{
          search,
          setSearch,
          handleSearch,
          handleKeyDown,
          searchInputRef,
        }}
      />

      {!hideBottomNav && (
        <MobileBottomNav
          user={user}
          isAuthenticated={isAuthenticated}
        />
      )}
    </>
  );
};

export default Navbar;