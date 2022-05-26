import React, { FC } from "react";

import NewCatalog from "./components/NewCatalog";
import AdminCatalogChoose from "./components/AdminCatalogChoose";

interface AdminCatalogPageProps {}

const AdminCatalogPage: FC<AdminCatalogPageProps> = () => {
  return (
    <>
      <NewCatalog />
      <AdminCatalogChoose />
    </>
  );
};

export default AdminCatalogPage;
