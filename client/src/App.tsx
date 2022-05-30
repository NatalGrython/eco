import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { mapRoutes } from "./utils/routeMapComponent";
import "./styles/global.scss";
import { useEffect } from "react";
import { checkAuthorizationAction } from "./store/auth/actions";
import { getProductsAction } from "./store/product/action";
import { getCatalogsAction } from "./store/catalog/action";
import { useChangeLocation } from "./hooks/useChangeLocation";

const routeSelector = (state: RootState) => {
  const stateRoutes = state.routes.routes;
  return {
    routes: mapRoutes(stateRoutes),
  };
};

const useInit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthorizationAction());
    dispatch(getProductsAction());
    dispatch(getCatalogsAction());
  }, []);
};

function App() {
  const { routes } = useSelector(routeSelector);
  const routeJsx = useRoutes(routes);
  useInit();
  useChangeLocation();

  return routeJsx;
}

export default App;
