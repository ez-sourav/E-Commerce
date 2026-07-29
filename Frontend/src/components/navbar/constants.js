import {
  Home,
  ShoppingBag,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";

export const DESKTOP_LINKS = [
  {
    to: "/",
    label: "Home",
    end: true,
  },
  {
    to: "/shop",
    label: "Shop",
  },
  {
    to: "/collections",
    label: "Collections",
  },
];

export const GUEST_BOTTOM_TABS = [
  {
    to: "/",
    label: "Home",
    icon: Home,
    end: true,
  },
  {
    to: "/shop",
    label: "Shop",
    icon: ShoppingBag,
  },
  {
    to: "/cart",
    label: "Cart",
    icon: ShoppingCart,
  },
  {
    to: "/login",
    label: "Login",
    icon: User,
  },
];

export const AUTH_BOTTOM_TABS = [
  {
    to: "/",
    label: "Home",
    icon: Home,
    end: true,
  },
  {
    to: "/shop",
    label: "Shop",
    icon: ShoppingBag,
  },
  {
    to: "/wishlist",
    label: "Wishlist",
    icon: Heart,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
];