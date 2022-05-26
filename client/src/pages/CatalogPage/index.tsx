import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Grid from "../../components/UI/Grid";
import Preview from "../../components/Preview";
import Product from "../../components/Product";
import classNames from "./index.module.scss";

import { useCatalog } from "../../hooks/useCatalog";

interface CatalogPageProps {}

const CatalogPage: FC<CatalogPageProps> = () => {
  const { catalogId } = useParams();
  const catalog = useCatalog(Number(catalogId));

  if (catalog) {
    return (
      <>
        <Preview title={catalog.name} imagePath={catalog.imagePath} />
        <div className={classNames["catalog__page__wrapper"]}>
          <Grid
            component={Product}
            items={catalog.products}
            keyExtractor={(item) => item.id}
            rowGap="36px"
          />
        </div>
      </>
    );
  }

  return null;
};

export default CatalogPage;
