import React, { FC } from "react";
import { useParams } from "react-router-dom";
import classNames from "./index.module.scss";
import ProductContent from "../../components/ProductContent";
import { useQuery } from "../../hooks/useQuery";
import { useProduct } from "../../hooks/useProduct";

interface ProductPageProps {}

const ProductPage: FC<ProductPageProps> = () => {
  const { productId } = useParams();
  const catalogId = useQuery("catalogId");
  const product = useProduct(Number(productId));

  if (catalogId && productId) {
    if (product) {
      return (
        <div className={classNames["product__page"]}>
          <div className="container">
            <ProductContent
              productId={productId}
              catalogId={catalogId}
              update
              product={product}
            />
          </div>
        </div>
      );
    }
    return null;
  } else if (catalogId && !productId) {
    return (
      <div className={classNames["product__page"]}>
        <div className="container">
          <ProductContent create catalogId={catalogId} />
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className={classNames["product__page"]}>
      <div className="container">
        <ProductContent product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
