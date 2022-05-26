import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import Authorization from "./components/Authorization";
import OrderComplete from "./components/OrderComplete";

console.log(import.meta.env);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Authorization />
        <OrderComplete />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
