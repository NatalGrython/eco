import { createAction } from "@reduxjs/toolkit";
import { Catalog } from "../../types/client/catalog";
import { Product } from "../../types/client/product";
import { CreateCatalogDto, UpdateCatalogDto } from "../../types/forms/catalog";
import {
  CREATE_CATALOG,
  CREATE_CATALOG_REJECT,
  CREATE_CATALOG_SUCCESS,
  GET_CATALOGS,
  GET_CATALOGS_REJECT,
  GET_CATALOGS_SUCCESS,
  UPDATE_CATALOG,
  UPDATE_CATALOG_SUCCESS,
  UPDATE_CATALOG_REJECT,
  UPDATE_CATALOG_PRODUCTS,
  UPDATE_CATALOG_PRODUCTS_SUCCESS,
  DELETE_CATALOG,
  DELETE_CATALOG_SUCCESS,
  DELETE_CATALOG_REJECT,
} from "./constants";

export const createCatalogAction =
  createAction<CreateCatalogDto>(CREATE_CATALOG);
export const createCatalogSuccessAction = createAction<Catalog>(
  CREATE_CATALOG_SUCCESS
);
export const createCatalogRejectAction = createAction(CREATE_CATALOG_REJECT);

export const updateCatalogAction =
  createAction<UpdateCatalogDto>(UPDATE_CATALOG);
export const updateCatalogSuccessAction = createAction<Catalog[]>(
  UPDATE_CATALOG_SUCCESS
);
export const updateCatalogRejectAction = createAction(UPDATE_CATALOG_REJECT);

export const getCatalogsAction = createAction(GET_CATALOGS);
export const getCatalogsSuccessAction =
  createAction<Catalog[]>(GET_CATALOGS_SUCCESS);
export const getCatalogsRejectAction = createAction(GET_CATALOGS_REJECT);

export const updateCatalogProductsAction = createAction<Product>(
  UPDATE_CATALOG_PRODUCTS
);
export const updateCatalogProductsSuccessAction = createAction<Catalog[]>(
  UPDATE_CATALOG_PRODUCTS_SUCCESS
);

export const deleteCatalogAction = createAction<number>(DELETE_CATALOG);
export const deleteCatalogSuccessAction = createAction<Catalog[]>(
  DELETE_CATALOG_SUCCESS
);
export const deleteCatalogRejectAction = createAction(DELETE_CATALOG_REJECT);
