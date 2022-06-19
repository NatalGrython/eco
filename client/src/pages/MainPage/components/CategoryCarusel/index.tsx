import React, { FC } from "react";
import Carousel from "../../../../components/UI/Carousel";
import { Catalog } from "../../../../types/client/catalog";
import CategoryCard from "../CategoryCard";
import classNames from "./index.module.scss";

interface CategoryCarouselProps {
  catalogs: Catalog[];
}

const CategoryCarousel: FC<CategoryCarouselProps> = ({ catalogs }) => {
  return (
    <div className={classNames["category-carosel"]}>
      <Carousel
        items={catalogs.map((item) => ({
          title: item.name,
          path: `/catalog/${item.id}`,
          ...item,
          imagePath: item.miniPath,
        }))}
        carouselOptions={{
          dots: false,
          arrows: false,
          infinite: true,
          speed: 500,
          slidesToShow: 5,
          slidesToScroll: 5,
          responsive: [
            {
              breakpoint: 1040,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 840,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 540,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
          ],
        }}
        keyExtractor={(item) => item.id}
        component={CategoryCard}
      />
    </div>
  );
};

export default CategoryCarousel;
