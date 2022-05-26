import React, { FC } from "react";

import Category from "./components/Category";
import Main from "./components/Main";
import Preview from "./components/Preview";
import Promise from "./components/Promise";
import Quality from "./components/Quality";
import MainChoose from "./components/MainChoose";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  return (
    <>
      <Main />
      <Category />
      <Preview />
      <Quality />
      <Promise />
      <MainChoose />
    </>
  );
};

export default MainPage;
