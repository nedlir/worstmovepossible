import { useState } from "react";

export interface MenuTouchProps {
  role: "button";
  tabIndex: 0;
  onTouchStart: () => void;
  style: { touchAction: "manipulation" };
}

export const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const touchProps: MenuTouchProps = {
    role: "button",
    tabIndex: 0,
    onTouchStart: () => {},
    style: { touchAction: "manipulation" },
  };

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    touchProps,
  };
};
