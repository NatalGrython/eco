import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import ButtonUp from "../ButtonUp";
import Footer from "../Footer";
import Header from "../Header";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
      <ButtonUp />
    </div>
  );
};

export default Layout;
