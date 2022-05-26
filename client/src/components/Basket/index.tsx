import React, { FC } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import BasketProduct from "./components/BasketProduct";
import classNames from "./index.module.scss";
import img from "@images/main.png";
import { useDispatch, useSelector } from "react-redux";
import { basketProductSelector } from "../../store/selectors";
import { checkoutOrder, deleteCurrentOrder } from "../../store/order/actions";
import { RootState } from "../../store";
import { closeBasketAction } from "../../store/basket/action";

interface BasketProps {}

const selector = (state: RootState) => state.basket.basketOpened;

const Basket: FC<BasketProps> = () => {
  const { basketProducts } = useSelector(basketProductSelector);
  const open = useSelector(selector);

  const dispatch = useDispatch();

  const finalPrice = basketProducts.reduce((acc, product) => {
    acc = acc + product.amount * product.price;
    return acc;
  }, 0);

  const onCreate = () => {
    dispatch(checkoutOrder());
  };

  const onClose = () => {
    dispatch(closeBasketAction());
    dispatch(deleteCurrentOrder());
  };

  return (
    <Drawer size={565} onClose={onClose} direction="right" open={open}>
      <div className={classNames["basket__wrapper"]}>
        <div className={classNames["basket__container"]}>
          <div className={classNames.basket}>
            <h2 className={classNames["basket__title"]}>Корзина</h2>
            <div className={classNames["basket__products__container"]}>
              {basketProducts.map((item) => (
                <BasketProduct
                  id={item.id}
                  key={item.id}
                  price={item.price}
                  weigh={item.weight}
                  title={item.name}
                  imagePath={item.imagePath}
                  amount={item.amount}
                />
              ))}
            </div>
            <div className={classNames["basket__total"]}>
              <div className={classNames["basket__total_wrapper"]}>
                <div className={classNames["basket__prices"]}>
                  <span className={classNames["basket__price"]}>Итог</span>
                  <span className={classNames["basket__price"]}>
                    {finalPrice} ₽
                  </span>
                </div>
                <span className={classNames["basket__delivery"]}>
                  Бесплатная доставка
                </span>
              </div>
              <button
                onClick={onCreate}
                className={classNames["basket__total_button"]}
              >
                <span>Оплатить</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default Basket;
