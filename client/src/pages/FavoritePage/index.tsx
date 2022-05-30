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
        {favoriteProducts.length ? (
          <Grid
            component={Product}
            items={favoriteProducts}
            keyExtractor={(item) => item.id}
            rowGap="36px"
          />
        ) : (
          <div className="container">
            <span className={classNames["void-text"]}>
              Вы еще ничего не выбрали
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritePage;
