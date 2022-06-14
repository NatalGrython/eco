import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ButtonUp from "../ButtonUp";
import Footer from "../Footer";
import Header from "../Header";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
      <ButtonUp />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Layout;
