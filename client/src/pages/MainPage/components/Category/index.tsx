import React, { FC } from "react";
import CategoryCard from "../CategoryCard";
import classNames from "./index.module.scss";
import img from "@images/main.png";
import { useSelector } from "react-redux";
import { catalogsSelector } from "../../../../store/selectors";
import CategoryCarousel from "../CategoryCarusel";

interface CategoryProps {}

const Category: FC<CategoryProps> = () => {
  const { catalogs } = useSelector(catalogsSelector);
  console.log({ catalogs });
  return (
    <div className={classNames.category}>
      <div className="container">
        <div className={classNames["category__title_wrapper"]}>
          <h2 className={classNames["category__title"]}>
            Здоровые, натуральные продукты, которым вы можете доверять
          </h2>
        </div>
        {catalogs.length <= 5 ? (
          <div className={classNames["category__wrapper"]}>
            {catalogs.map((item) => (
              <CategoryCard
                id={item.id}
                key={item.id}
                imagePath={item.miniPath}
                title={item.name}
                path={`catalog/${item.id}`}
              />
            ))}
          </div>
        ) : (
          <CategoryCarousel catalogs={catalogs} />
        )}
      </div>
    </div>
  );
};

export default Category;
