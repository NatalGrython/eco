import React, { FC } from "react";
import Filters from "./components/Filters";
import MainOrderAdminPage from "./components/Main";

interface AdminOrdersPageProps {}

const AdminOrdersPage: FC<AdminOrdersPageProps> = () => {
  return (
    <>
      <Filters />
      <MainOrderAdminPage />
    </>
  );
};

export default AdminOrdersPage;
