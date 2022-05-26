import React, { FC } from "react";
import Choose from "../../../../components/Choose";
import classNames from "./index.module.scss";
import { useSelector } from "react-redux";
import { productsSelector } from "../../../../store/selectors";

interface MainChooseProps {}

const MainChoose: FC<MainChooseProps> = () => {
  const products = useSelector(productsSelector);
  return (
    <div className={classNames.main__choose}>
      <Choose items={products} />
    </div>
  );
};

export default MainChoose;
