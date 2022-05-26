import Layout from "../../components/Layout";
import CatalogPage from "../../pages/CatalogPage";
import FavoritePage from "../../pages/FavoritePage";
import MainCatalogPage from "../../pages/MainCatalogPage";
import MainPage from "../../pages/MainPage";
import ProductPage from "../../pages/ProductPage";
import SearchPage from "../../pages/SearchPage";
import VKAuthPage from "../../pages/VKAuthPage";
import { RouteObjectStore } from "../../types/routes";

export const initialRoutes: RouteObjectStore[] = [
  {
    path: "/",
    element: Layout.name,
    children: [
      {
        path: "auth",
        children: [
          {
            path: "vk",
            element: VKAuthPage.name,
          },
        ],
      },
      {
        index: true,
        element: MainPage.name,
      },
      {
        path: "product/:productId",
        element: ProductPage.name,
      },
      {
        path: "catalog",
        children: [
          {
            index: true,
            element: MainCatalogPage.name,
          },
          {
            path: ":catalogId",
            element: CatalogPage.name,
          },
        ],
      },
      {
        path: "favorite",
        element: FavoritePage.name,
      },
      {
        path: "search",
        element: SearchPage.name,
      },
    ],
  },
];
