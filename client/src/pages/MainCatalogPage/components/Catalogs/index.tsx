import React, { FC } from "react";
import { useSelector } from "react-redux";
import CatalogPreview from "../../../../components/CatalogPreview";
import { catalogsSelector } from "../../../../store/selectors";
import classNames from "./index.module.scss";

interface CatalogsProps {}

const Catalogs: FC<CatalogsProps> = () => {
  const { catalogs } = useSelector(catalogsSelector);

  return (
    <div className={classNames["catalog__wrapper"]}>
      {catalogs.map((item) => (
        <CatalogPreview
          key={item.id}
          title={item.name}
          products={item.products}
        />
      ))}
    </div>
  );
};

export default Catalogs;
