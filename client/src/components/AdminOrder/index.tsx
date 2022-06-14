import React, { FC } from "react";
import OrderProduct from "../OrderProduct";
import classNames from "./index.module.scss";
import AdminCheckbox from "../UI/AdminCheckbox";
import { Product } from "../../types/client/product";
import { Address, Status } from "../../types/common";
import { ServerOrderUser } from "../../types/server/orders";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { updateOrderAction } from "../../store/order/actions";

interface AdminOrderProps extends Address {
  id: number;
  timestamp: string;
  products: (Product & { amount: number })[];
  user: ServerOrderUser;
  status: Status;
}

const AdminOrder: FC<AdminOrderProps> = ({
  id,
  timestamp,
  products,
  user,
  status,
  ...address
}) => {
  const checked = (innerStatus: Status) => innerStatus === status;
  const dispatch = useDispatch();

  const onChangeChecked = (innerStatus: Status) => () => {
    dispatch(
      updateOrderAction({
        id,
        status: innerStatus,
      })
    );
  };

  return (
    <div className={classNames["admin-order"]}>
      <div className={classNames["admin-order__header"]}>
        <div className={classNames["admin-order__container"]}>
          <div className={classNames["admin-order__header__content"]}>
            <span className={classNames["admin-order__text"]}>Заказ №{id}</span>
            <span className={classNames["admin-order__text"]}>
              Дата заказа: {format(new Date(timestamp), "d.MM.yyyy")}
            </span>
          </div>
        </div>
      </div>
      <div className={classNames["admin-order__main"]}>
        <div className={classNames["admin-order__container"]}>
          <div className={classNames["admin-order__main__content"]}>
            <div className={classNames["admin-order__main__maintenance"]}>
              <span className={classNames["admin-order__text"]}>
                Содержимое заказа:
              </span>
              <div className={classNames["admin-order__main__filing"]}>
                {products.map((product) => (
                  <OrderProduct
                    key={product.imagePath}
                    imagePath={product.imagePath}
                    amount={product.amount}
                    price={product.price}
                    title={product.name}
                  />
                ))}
              </div>
              <div className={classNames["admin-order__main__total"]}>
                <span className={classNames["admin-order__text"]}>
                  Общая сумма заказа:
                </span>
                <span className={classNames["admin-order__text"]}>600р</span>
              </div>
            </div>
            <div className={classNames["admin-order__main__description"]}>
              <h4
                className={classNames["admin-order__main__description__title"]}
              >
                Информация о получателе:
              </h4>
              <span
                className={classNames["admin-order__main__description__text"]}
              >
                Получатель: {user.email ?? user.login}
              </span>
              <span
                className={classNames["admin-order__main__description__text"]}
              >
                ФИО: {user.name} {user.surname} {user.patronymic}
              </span>
              <span
                className={classNames["admin-order__main__description__text"]}
              >
                Адрес доставки: {address.address}, {address.flat}
              </span>
              <span
                className={classNames["admin-order__main__description__text"]}
              >
                Примечание к заказу: {address.comment ?? "Нет"}
              </span>
              <span
                className={classNames["admin-order__main__description__text"]}
              >
                Номер телефона: {address.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames["admin-order__footer"]}>
        <div className={classNames["admin-order__container"]}>
          <div className={classNames["admin-order__footer__content"]}>
            <span className={classNames["admin-order__text"]}>
              Статус заказа:
            </span>
            <AdminCheckbox
              checked={checked("InProgress")}
              onChange={onChangeChecked("InProgress")}
              title="В обработке"
            />
            <AdminCheckbox
              checked={checked("Assembled")}
              onChange={onChangeChecked("Assembled")}
              title="Собран"
            />
            <AdminCheckbox
              checked={checked("AtTheCourier")}
              onChange={onChangeChecked("AtTheCourier")}
              title="Передан курьеру"
            />
            <AdminCheckbox
              checked={checked("Delivered")}
              onChange={onChangeChecked("Delivered")}
              title="Доставлен"
            />
            <AdminCheckbox
              checked={checked("Canceled")}
              onChange={onChangeChecked("Canceled")}
              title="Отменен"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
