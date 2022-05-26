import { put, takeLatest, takeLeading } from "redux-saga/effects";
import {
  createProductApi,
  getProductsApi,
  updateProductApi,
} from "../../api/product";
import { callTs, selectTs } from "../../types/store";
import { updateCatalogProductsAction } from "../catalog/action";
import {
  createProductRejectAction,
  createProductSuccessAction,
  getProductsRejectAction,
  getProductsSuccessAction,
  updateProductRejectAction,
  updateProductSuccessAction,
} from "./action";
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_FAVORITE_PRODUCT,
  UPDATE_PRODUCT,
} from "./constants";

function* createProduct(action: any) {
  try {
    const newProduct = yield* callTs(createProductApi, action.payload);
    yield put(createProductSuccessAction({ ...newProduct, liked: false }));
    yield put(updateCatalogProductsAction({ ...newProduct, liked: false }));
  } catch (error) {
    yield put(createProductRejectAction());
  }
}

function* updateProduct(action: any) {
  try {
    const { productId, ...updateData } = action.payload;
    const updatedProduct = yield* callTs(
      updateProductApi,
      productId,
      updateData
    );
    const products = yield* selectTs((state) => state.product.products);
    const newProducts = products.map((product) => {
      if (product.id === updatedProduct.id) {
        return { ...updatedProduct, liked: false };
      }
      return product;
    });
    yield put(updateProductSuccessAction(newProducts));
  } catch (error) {
    yield put(updateProductRejectAction());
  }
}

function* getProducts() {
  try {
    const products = yield* callTs(getProductsApi);
    const favoriteProducts = yield* selectTs(
      (state) => state.favorite.products
    );
    yield put(
      getProductsSuccessAction(
        products.map((item) => ({
          ...item,
          liked: !!favoriteProducts.find(({ id }) => item.id === id),
        }))
      )
    );
  } catch (error) {
    yield put(getProductsRejectAction());
  }
}

function* updateFavoriteProduct(action: any) {
  const products = yield* selectTs((state) => state.product.products);
  const favoriteProductUser = yield* selectTs(
    (state) => state.favorite.products
  );
  const allProducts = products.map((item) => {
    const candidate = favoriteProductUser.find(
      (product) => product.id === item.id
    );
    if (candidate) {
      return { ...item, liked: true };
    } else {
      return { ...item, liked: false };
    }
  });
  yield put(getProductsSuccessAction(allProducts));
}

export function* productWatcher() {
  yield takeLatest(CREATE_PRODUCT, createProduct);
  yield takeLeading(GET_PRODUCTS, getProducts);
  yield takeLatest(UPDATE_PRODUCT, updateProduct);
  yield takeLatest(UPDATE_FAVORITE_PRODUCT, updateFavoriteProduct);
}
