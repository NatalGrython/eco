import React, { FC } from "react";
import { useSelector } from "react-redux";
import AdminOrder from "../../../../components/AdminOrder";
import { orderProductSelector } from "../../../../store/selectors";
import { useFilteredOrders } from "./hooks/useFilters";
import classNames from "./index.module.scss";

interface MainOrderAdminPageProps {}

const MainOrderAdminPage: FC<MainOrderAdminPageProps> = () => {
  const { orders: rowOrders } = useSelector(orderProductSelector);
  const { orders } = useFilteredOrders(rowOrders);
  return (
    <div className={classNames["main-order"]}>
      <div className="container">
        <div className={classNames["main-order__content"]}>
          {orders.map((item) => (
            <>
              {console.log(item)}
              <AdminOrder key={item.id} {...item} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainOrderAdminPage;
