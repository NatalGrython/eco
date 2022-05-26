import { useMemo } from "react";
import { useSelector } from "react-redux";
import { catalogsSelector } from "../store/selectors";

export const useCatalog = (catalogId: number) => {
  const { catalogs } = useSelector(catalogsSelector);
  return useMemo(
    () => catalogs.find((catalog) => catalog.id === catalogId),
    [catalogs, catalogId]
  );
};
