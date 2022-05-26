import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Minus, Plus } from "../../../../icons";
import { updateBasketAction } from "../../../../store/basket/action";
import classNames from "./index.module.scss";

interface BasketProductProps {
  title: string;
  price: number;
  weigh: number;
  imagePath: string;
  amount: number;
  id: number;
}

const BasketProduct: FC<BasketProductProps> = ({
  price,
  weigh,
  title,
  imagePath,
  amount,
  id,
}) => {
  const dispatch = useDispatch();

  const onClickMinus = () => {
    dispatch(updateBasketAction([{ id, amount: amount - 1 }]));
  };

  const onClickPlus = () => {
    dispatch(updateBasketAction([{ id, amount: amount + 1 }]));
  };

  return (
    <div className={classNames["basket_product"]}>
      <div
        className={classNames["basket_product__image"]}
        style={{ backgroundImage: `url('${imagePath}')` }}
      />
      <div className={classNames["basket_product__content"]}>
        <div className={classNames["basket_product__content__container"]}>
          <div className={classNames["basket_product__info"]}>
            <span className={classNames["basket_product__info_text"]}>
              {title}
            </span>
            <span className={classNames["basket_product__info_text"]}>
              {price} ₽ / {weigh} г
            </span>
            <div className={classNames["basket_product__contorllers"]}>
              <button
                onClick={onClickMinus}
                className={classNames["basket_product_button"]}
              >
                <Minus />
              </button>
              <input
                value={amount}
                className={classNames["input"]}
                type="text"
              />
              <button
                onClick={onClickPlus}
                className={classNames["basket_product_button"]}
              >
                <Plus />
              </button>
              <span className={classNames["basket_product__info_text"]}>
                шт
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketProduct;
