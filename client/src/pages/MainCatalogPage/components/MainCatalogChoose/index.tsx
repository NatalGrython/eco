import React, { FC } from "react";
import Choose from "../../../../components/Choose";
import classNames from "./index.module.scss";
import img from "@images/main.png";
import { useSelector } from "react-redux";
import { productsSelector } from "../../../../store/selectors";

interface MainCatalogChooseProps {}

const MainCatalogChoose: FC<MainCatalogChooseProps> = () => {
  const products = useSelector(productsSelector);
  return (
    <div className={classNames.main_catalog_choose}>
      <Choose items={products} />
    </div>
  );
};

export default MainCatalogChoose;
