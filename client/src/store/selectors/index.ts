import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const productsSelector = (state: RootState) => state.product.products;

export const catalogsSelector = (state: RootState) => {
  const catalogs = state.catalog.catalogs;
  const products = productsSelector(state);
  const mergedCatalogs = catalogs.map((catalog) => {
    const catalogProducts = catalog.products.map(({ id }) => {
      const candidate = products.find((product) => product.id === id);
      return candidate!;
    });
    const filtredCatalogProducts = catalogProducts.filter((item) => !!item);
    return {
      ...catalog,
      products: filtredCatalogProducts,
    };
  });

  return {
    catalogs: mergedCatalogs,
  };
};

export const favoriteProductSelector = (state: RootState) => {
  const products = productsSelector(state);
  const favorite = state.favorite;
  const favoriteProducts = favorite.products.map(({ id }) => {
    const candidate = products.find((product) => product.id === id);
    return candidate!;
  });
  const filtredFavoriteProducts = favoriteProducts.filter((item) => !!item);
  return {
    favoriteProducts: filtredFavoriteProducts,
  };
};
export const basketProductSelector = (state: RootState) => {
  const products = productsSelector(state);
  const basket = state.basket;
  const basketProducts = basket.products.map(({ product: { id }, amount }) => {
    const candidate = products.find((product) => product.id === id)!;
    if (candidate) {
      return { ...candidate, amount };
    } else {
      return undefined;
    }
  });
  const filtredBasketProducts = basketProducts.filter((item) => !!item);
  return {
    basketProducts: filtredBasketProducts,
  };
};

export const orderProductSelector = (state: RootState) => {
  const products = productsSelector(state);
  const order = state.order;
  const orders = order.orders.map((order) => {
    const orderProducts = order.products.map((orderProduct) => {
      const candidate = products.find(
        (product) => product.id === orderProduct.product.id
      )!;
      return { ...candidate, amount: orderProduct.amount };
    });
    return { ...order, products: orderProducts };
  });
  return {
    orders,
  };
};

export type OrderWithProductType = ReturnType<typeof orderProductSelector>;
