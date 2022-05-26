import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "../../../../icons";
import classNames from "./index.module.scss";

interface CategoryCardProps {
  title: string;
  path: string;
  imagePath: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ title, path, imagePath }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(path);
  };

  return (
    <div
      className={classNames["category_card"]}
      style={{
        backgroundImage: `url('${imagePath}')`,
      }}
    >
      <h3 className={classNames["category_card_title"]}>{title}</h3>
      <button className={classNames["category_card_button"]} onClick={onClick}>
        <ArrowRight />
      </button>
    </div>
  );
};

export default CategoryCard;
