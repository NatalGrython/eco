import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animateScroll } from "react-scroll";

export const useChangeLocation = () => {
  const location = useLocation();

  useEffect(() => {
    animateScroll.scrollToTop();
  }, [location]);
};
