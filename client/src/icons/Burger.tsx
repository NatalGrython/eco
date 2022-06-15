import React, { FC } from "react";

interface BurgerProps {}

const Burger: FC<BurgerProps> = () => {
  return (
    <svg fill="#08DB11" viewBox="0 0 100 80" width="40" height="40">
      <rect rx={10} width="100" height="20"></rect>
      <rect rx={10} y="30" width="100" height="20"></rect>
      <rect rx={10} y="60" width="100" height="20"></rect>
    </svg>
  );
};

export default Burger;
