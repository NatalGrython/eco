import React, { FC, useEffect, useState } from "react";
import { ArrowRight } from "../../icons";
import { animateScroll } from "react-scroll";
import classNames from "./index.module.scss";

interface ButtonUpProps {}

const ButtonUp: FC<ButtonUpProps> = () => {
  const [hide, setHide] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > document.documentElement.clientHeight) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onClick = () => {
    animateScroll.scrollToTop();
  };

  return (
    <button
      style={{ display: hide ? "none" : "flex" }}
      onClick={onClick}
      className={classNames.button}
    >
      <ArrowRight />
    </button>
  );
};

export default ButtonUp;
