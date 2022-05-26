import Layout from "../components/Layout";
import MainCatalogPage from "../pages/MainCatalogPage";
import FavoritePage from "../pages/FavoritePage";
import MainPage from "../pages/MainPage";
import CatalogPage from "../pages/CatalogPage";
import ProductPage from "../pages/ProductPage";
import UserPage from "../pages/UserPage";
import AccountUserPage from "../pages/UserPage/components/Account";
import OrdersUserPage from "../pages/UserPage/components/Orders";
import { RouteObject } from "react-router-dom";
import { RouteObjectStore } from "../types/routes";
import AuthInfoUserPage from "../pages/UserPage/components/AuthInfo";
import AdminCatalogPage from "../pages/AdminCatalogPage";
import AdminOrdersPage from "../pages/AdminOredersPage";
import VKAuthPage from "../pages/VKAuthPage";
import SearchPage from "../pages/SearchPage";

const routeMapObject = {
  [Layout.name]: <Layout />,
  [MainCatalogPage.name]: <MainCatalogPage />,
  [FavoritePage.name]: <FavoritePage />,
  [MainPage.name]: <MainPage />,
  [CatalogPage.name]: <CatalogPage />,
  [ProductPage.name]: <ProductPage />,
  [UserPage.name]: <UserPage />,
  [AccountUserPage.name]: <AccountUserPage />,
  [OrdersUserPage.name]: <OrdersUserPage />,
  [AuthInfoUserPage.name]: <AuthInfoUserPage />,
  [AdminCatalogPage.name]: <AdminCatalogPage />,
  [AdminOrdersPage.name]: <AdminOrdersPage />,
  [VKAuthPage.name]: <VKAuthPage />,
  [SearchPage.name]: <SearchPage />,
} as const;

export const mapRoutes = (routes: RouteObjectStore[]): RouteObject[] =>
  routes.map((route) => {
    if (route.children) {
      return {
        ...route,
        element: route.element ? routeMapObject[route.element] : undefined,
        children: mapRoutes(route.children),
      };
    }
    return {
      ...route,
      element: route.element ? routeMapObject[route.element] : undefined,
    };
  });
