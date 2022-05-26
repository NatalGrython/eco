import React, { FC } from "react";
import Catalogs from "./components/Catalogs";
import Preview from "../../components/Preview";
import MainCatalogChoose from "./components/MainCatalogChoose";

interface MainCatalogPageProps {}

const MainCatalogPage: FC<MainCatalogPageProps> = () => {
  return (
    <>
      <Preview />
      <MainCatalogChoose />
      <Catalogs />
    </>
  );
};

export default MainCatalogPage;
