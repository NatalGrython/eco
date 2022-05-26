import React, { FC } from "react";
import { useSelector } from "react-redux";
import Product from "../../../../components/Product";
import Grid from "../../../../components/UI/Grid";
import { productsSelector } from "../../../../store/selectors";
import { useFilteredProducts } from "../../hooks";
import classNames from "./index.module.scss";

interface SearchPageItemsProps {}

const SearchPageItems: FC<SearchPageItemsProps> = () => {
  const rowProducts = useSelector(productsSelector);
  const { products } = useFilteredProducts(rowProducts);
  return (
    <div className={classNames.items}>
      <Grid
        rowGap="36px"
        items={products}
        keyExtractor={(item) => item.id}
        component={Product}
      />
    </div>
  );
};

export default SearchPageItems;
