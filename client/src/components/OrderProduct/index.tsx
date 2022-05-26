import React, { FC } from "react";
import { Minus, Plus } from "../../icons";
import classNames from "./index.module.scss";

interface OrderProductProps {
  imagePath: string;
  title: string;
  price: number;
  amount: number;
}

const OrderProduct: FC<OrderProductProps> = ({
  imagePath,
  title,
  price,
  amount,
}) => {
  return (
    <div className={classNames["order_product"]}>
      <div
        className={classNames["order_product__image"]}
        style={{ backgroundImage: `url('${imagePath}')` }}
      />
      <div className={classNames.order_product__text__container}>
        <span className={classNames.order_product__text}>{title}</span>
        <span className={classNames.order_product__text}>{amount} шт</span>
        <span className={classNames.order_product__text}>
          {price * amount} Р
        </span>
      </div>
    </div>
  );
};

export default OrderProduct;
