// @ts-nocheck
import { useState, useEffect } from "react";

const useDeviceView = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      setIsMobileView(screenWidth < 768);
      setIsTabletView(screenWidth >= 768 && screenWidth < 1024);
      setIsDesktopView(screenWidth >= 1024);
    };

    // Initial check on mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobileView, isTabletView, isDesktopView };
};

export default useDeviceView;
