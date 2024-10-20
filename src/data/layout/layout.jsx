import {
  FaAddressCard,
  FaBoxOpen,
  FaHeart,
  FaLock,
  FaShoppingBag,
  FaShoppingBasket,
  FaStar,
  FaUserCircle,
  FaWallet,
} from "react-icons/fa";
import { MdWindow } from "react-icons/md";

export const layout = {
  left_side: [
    {
      name: "Dashboard",
      icon: <MdWindow />,
      link: "/",
    },
    {
      name: "Order",
      icon: <FaShoppingBag />,
      link: "/order",
    },
    {
      name: "Edit Profile",
      icon: <FaUserCircle />,
      link: "/edit-profile",
    },
    {
      name: "Change Password",
      icon: <FaLock />,
      link: "/change-password",
    },
    {
      name: "Address",
      icon: <FaAddressCard />,
      link: "/address",
    },
    {
      name: "Wishlist",
      icon: <FaHeart />,
      link: "/wishlist",
    },
    {
      name: "My Cart",
      icon: <FaShoppingBasket />,
      link: "/my-cart",
    },
    {
      name: "Account Transaction",
      icon: <FaWallet />,
      link: "/account-transaction",
    },
    {
      name: "My Reviews",
      icon: <FaStar />,
      link: "/my-reviews",
    },
    {
      name: "Add Product",
      icon: <FaBoxOpen />,
      link: "/add-product",
    },
    {
      name: "Personal Information",
      icon: <FaBoxOpen />,
      link: "/personal-info",
    },
    {
      name: "Business Information",
      icon: <FaBoxOpen />,
      link: "/business-info",
    },
    {
      name: "Banner Information",
      icon: <FaBoxOpen />,
      link: "/banner-info",
    },
  ],
};
