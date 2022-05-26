import React, { FC } from "react";
import { Accordion } from "react-accessible-accordion";
import Order from "../../../../components/UserOrder";
import "react-accessible-accordion/dist/fancy-example.css";
import classNames from "./index.module.scss";
import { useSelector } from "react-redux";
import { orderProductSelector } from "../../../../store/selectors";

interface OrdersUserPageProps {}

const OrdersUserPage: FC<OrdersUserPageProps> = () => {
  const { orders } = useSelector(orderProductSelector);
  return (
    <div className={classNames.orders}>
      <h2 className={classNames.orders__title}> История заказов</h2>
      <div className={classNames.orders__items__container}>
        <Accordion
          className={classNames["orders__items"]}
          allowMultipleExpanded
          allowZeroExpanded
        >
          {orders.map((item) => (
            <Order key={item.id} {...item} />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default OrdersUserPage;
