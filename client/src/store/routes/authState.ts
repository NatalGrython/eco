import Layout from "../../components/Layout";
import CatalogPage from "../../pages/CatalogPage";
import FavoritePage from "../../pages/FavoritePage";
import MainCatalogPage from "../../pages/MainCatalogPage";
import MainPage from "../../pages/MainPage";
import ProductPage from "../../pages/ProductPage";
import SearchPage from "../../pages/SearchPage";
import UserPage from "../../pages/UserPage";
import AccountUserPage from "../../pages/UserPage/components/Account";
import AuthInfoUserPage from "../../pages/UserPage/components/AuthInfo";
import OrdersUserPage from "../../pages/UserPage/components/Orders";
import VKAuthPage from "../../pages/VKAuthPage";
import { RouteObjectStore } from "../../types/routes";

export const authRoutes: RouteObjectStore[] = [
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
        path: "user/:userId",
        element: UserPage.name,
        children: [
          {
            path: "account",
            element: AccountUserPage.name,
          },
          {
            path: "orders",
            element: OrdersUserPage.name,
          },
          {
            path: "auth",
            element: AuthInfoUserPage.name,
          },
        ],
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
