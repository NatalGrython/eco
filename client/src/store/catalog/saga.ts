import { put, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import {
  createCatalogApi,
  updateCatalogApi,
  getCatalogsApi,
  getCatalogApi,
} from "../../api/catalog";
import { callTs, selectTs } from "../../types/store";
import {
  getCatalogsSuccessAction,
  createCatalogAction,
  updateCatalogAction,
  createCatalogRejectAction,
  updateCatalogRejectAction,
  getCatalogsRejectAction,
  createCatalogSuccessAction,
  updateCatalogSuccessAction,
  updateCatalogProductsAction,
  updateCatalogProductsSuccessAction,
} from "./action";
import {
  CREATE_CATALOG,
  GET_CATALOGS,
  UPDATE_CATALOG,
  UPDATE_CATALOG_PRODUCTS,
} from "./constants";

function* createCatalog(action: ReturnType<typeof createCatalogAction>) {
  try {
    const newCatalog = yield* callTs(createCatalogApi, action.payload);
    yield put(createCatalogSuccessAction({ ...newCatalog, products: [] }));
  } catch (error) {
    yield put(createCatalogRejectAction());
  }
}

function* updateCatalog(action: ReturnType<typeof updateCatalogAction>) {
  try {
    const updatedCatalog = yield* callTs(
      updateCatalogApi,
      action.payload.id,
      action.payload
    );
    const catalogs = yield* selectTs((state) => state.catalog.catalogs);
    const newCatalogs = catalogs.map((item) => {
      if (item.id === updatedCatalog.id) {
        return updatedCatalog;
      }
      return item;
    });
    yield put(updateCatalogSuccessAction(newCatalogs));
  } catch (error) {
    yield put(updateCatalogRejectAction());
  }
}

function* getCatalogs() {
  try {
    const catalogs = yield* callTs(getCatalogsApi);
    yield put(getCatalogsSuccessAction(catalogs));
  } catch (error) {
    yield put(getCatalogsRejectAction());
  }
}

function* updateCatalogProducts(
  action: ReturnType<typeof updateCatalogProductsAction>
) {
  const product = action.payload;
  const catalogs = yield* selectTs((state) => state.catalog.catalogs);

  const newCatalogs = catalogs.map((catalog) => {
    if (catalog.id === product.catalog.id) {
      return {
        ...catalog,
        products: [...catalog.products, { id: product.id }],
      };
    }
    return catalog;
  });
  yield put(updateCatalogProductsSuccessAction(newCatalogs));
}

export function* catalogWatcher() {
  yield takeLatest(CREATE_CATALOG, createCatalog);
  yield takeLeading(GET_CATALOGS, getCatalogs);
  yield takeLatest(UPDATE_CATALOG, updateCatalog);
  yield takeEvery(UPDATE_CATALOG_PRODUCTS, updateCatalogProducts);
}
