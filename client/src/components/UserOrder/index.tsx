import React, { FC } from "react";
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import OrderProduct from "../OrderProduct";
import classNames from "./index.module.scss";
import { Product } from "../../types/client/product";
import { format } from "date-fns";
import { Status } from "../../types/common";

interface OrderProps {
  status: Status;
  products: (Product & { amount: number })[];
  timestamp: string;
}

const mapStatus: {
  [key in Status]: string;
} = {
  InProgress: "В обработке",
  Assembled: "Собран",
  AtTheCourier: "Передан курьеру",
  Canceled: "Отменен",
  Delivered: "Доставлен",
};

const Order: FC<OrderProps> = ({ status, products, timestamp }) => {
  const finalPrice = products.reduce((acc, product) => {
    acc = acc + product.amount * product.price;
    return acc;
  }, 0);
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton
          className={classNames["user-order__accordion_button"]}
        >
          <div className={classNames["user-order__preview"]}>
            <span className={classNames["user-order__preview__time"]}>
              Заказ от {format(new Date(timestamp), "d.MM.yyyy")}
            </span>
            <span className={classNames["user-order__preview__time"]}>
              {mapStatus[status]}
            </span>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className={classNames["user-order__item__panel"]}>
        <div className={classNames["user-order__container"]}>
          {products.map((item) => (
            <OrderProduct
              imagePath={item.imagePath}
              price={item.price}
              amount={item.amount}
              title={item.name}
            />
          ))}
          <div className={classNames["user-order__overview"]}>
            <span className={classNames["user-order__overview__text"]}>
              Общая сумма заказа
            </span>
            <span className={classNames["user-order__overview__text"]}>
              {finalPrice} р
            </span>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default Order;
