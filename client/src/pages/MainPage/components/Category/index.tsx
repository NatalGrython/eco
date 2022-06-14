import React, { FC } from "react";
import CategoryCard from "../CategoryCard";
import classNames from "./index.module.scss";
import img from "@images/main.png";
import { useSelector } from "react-redux";
import { catalogsSelector } from "../../../../store/selectors";
import Carousel from "../../../../components/UI/Carousel";

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
        <div className={classNames["category__wrapper"]}>
          {catalogs.map((item) => (
            <CategoryCard
              id={item.id}
              key={item.id}
              imagePath={item.imagePath}
              title={item.name}
              path={`catalog/${item.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
