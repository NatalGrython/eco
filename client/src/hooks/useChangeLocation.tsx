import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useChangeLocation = () => {
  const location = useLocation();

  useEffect(() => {
    window.scroll({
      left: 0,
      top: 0,
    });
  }, [location]);
};
