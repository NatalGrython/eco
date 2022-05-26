import { useMemo } from "react";
import { useSelector } from "react-redux";
import { productsSelector } from "../store/selectors";

export const useProduct = (productId: number) => {
  const products = useSelector(productsSelector);

  return useMemo(
    () => products.find((product) => product.id === productId),
    [products, productId]
  );
};
