import React, { FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import OrderProduct from "../../../OrderProduct";
import classNames from "./index.module.scss";
import img from "@images/main.png";
import { RootState } from "../../../../store";
import { useSelector } from "react-redux";

interface DetailsProps {}

const selector = (state: RootState) => {
  const products = state.product.products;
  const currentOrder = state.order.currentOrder;

  const orderProducts =
    currentOrder?.products?.map((item) => {
      const candidate = products.find(
        (product) => product.id === item.product.id
      )!;
      return { ...candidate, amount: item.amount };
    }) ?? [];
  return { orderProducts };
};

const Details: FC<DetailsProps> = () => {
  const { orderProducts } = useSelector(selector);
  const finalPrice = orderProducts.reduce((acc, product) => {
    acc = acc + product.amount * product.price;
    return acc;
  }, 0);
  return (
    <Accordion
      className={classNames.details__accordion}
      allowMultipleExpanded
      allowZeroExpanded
    >
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton className={classNames.details__accordion_button}>
            <div className={classNames.details__preview}>
              <span className={classNames.details__preview__time}>
                Общая сумма заказа: {finalPrice} р
              </span>
              <span className={classNames.details__preview__time}>
                Детали заказа
              </span>
            </div>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={classNames.details__item__panel}>
          <div className={classNames.details__container}>
            {orderProducts.map((item) => (
              <OrderProduct
                key={item.id}
                imagePath={item.imagePath}
                price={item.price}
                amount={item.amount}
                title={item.name}
              />
            ))}
          </div>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Details;
