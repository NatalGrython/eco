import Layout from "../../components/Layout";
import AdminCatalogPage from "../../pages/AdminCatalogPage";
import AdminOrdersPage from "../../pages/AdminOredersPage";
import ProductPage from "../../pages/ProductPage";
import { RouteObjectStore } from "../../types/routes";

export const adminRoutes: RouteObjectStore[] = [
  {
    path: "/",
    element: Layout.name,
    children: [
      {
        index: true,
        element: AdminCatalogPage.name,
      },
      {
        path: "orders",
        children: [
          {
            index: true,
            element: AdminOrdersPage.name,
          },
        ],
      },
      {
        path: "create",
        element: ProductPage.name,
      },
      {
        path: "create/:productId",
        element: ProductPage.name,
      },
    ],
  },
];
