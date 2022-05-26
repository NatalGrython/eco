import React, { FC } from "react";
import Grid from "../../components/UI/Grid";
import Product from "../../components/Product";
import classNames from "./index.module.scss";
import { useSelector } from "react-redux";
import { favoriteProductSelector } from "../../store/selectors";

interface FavoritePageProps {}

const FavoritePage: FC<FavoritePageProps> = () => {
  const { favoriteProducts } = useSelector(favoriteProductSelector);
  return (
    <>
      <div className={classNames["favoritepage__wrapper"]}>
        <Grid
          component={Product}
          items={favoriteProducts}
          keyExtractor={(item) => item.id}
          rowGap="36px"
        />
      </div>
    </>
  );
};

export default FavoritePage;
