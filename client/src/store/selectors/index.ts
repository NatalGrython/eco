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
    return {
      ...catalog,
      products: catalogProducts,
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
  return {
    favoriteProducts,
  };
};
export const basketProductSelector = (state: RootState) => {
  const products = productsSelector(state);
  const basket = state.basket;
  const basketProducts = basket.products.map(({ product: { id }, amount }) => {
    const candidate = products.find((product) => product.id === id)!;
    return { ...candidate, amount };
  });
  return {
    basketProducts,
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
