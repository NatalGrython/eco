import React, { FC } from "react";
import classNames from "./index.module.scss";
import Product from "../Product";
import { Product as ProductType } from "../../types/client/product";

interface CatalogPreviewProps {
  title: string;
  products: ProductType[];
}

const CatalogPreview: FC<CatalogPreviewProps> = ({ title, products }) => {
  if (!products.length) {
    return null;
  }

  return (
    <div className={classNames["catalog_preview"]}>
      <div className="container">
        <div className={classNames["catalog_preview_wrapper"]}>
          <h3 className={classNames["catalog_preview_title"]}>{title}</h3>
          <div className={classNames["catalog_preview_container"]}>
            {products.map((item, index, array) => (
              <Product
                key={item.id}
                name={item.name}
                price={item.price}
                weight={item.weight}
                imagePath={item.imagePath}
                //@ts-ignore
                preview={index === array.length - 1}
                //@ts-ignore
                catalogPath={`/catalog/${item.catalog.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPreview;
