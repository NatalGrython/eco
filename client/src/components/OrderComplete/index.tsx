import { useFormik } from "formik";
//@ts-nocheck
import React, { FC, useRef } from "react";
import ReactModal from "react-modal";
import { batch, useDispatch, useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks";
import { RootState } from "../../store";
import { openBasketAction } from "../../store/basket/action";
import { closeOrdersModal, createOrderAction } from "../../store/order/actions";
import Logo from "../Header/Logo";
import UserButton from "../UI/UserButton";
import Address from "./components/Address";
import Details from "./components/Details";
import { useCreateOrder } from "./hooks/useCreateOrder";
import classNames from "./index.module.scss";

interface OrderCompleteProps {}

const selector = (state: RootState) => state.order.openOrderModal;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 1120,
    height: "100%",
    border: "none",
    padding: 0,
  },
  overlay: {
    zIndex: 10,
  },
};

ReactModal.setAppElement("#order");

const OrderComplete: FC<OrderCompleteProps> = () => {
  const outSideRef = useRef<HTMLElement>(null);
  const isOpen = useSelector(selector);
  const dispatch = useDispatch();

  const onClickOutside = () => dispatch(closeOrdersModal());

  useOutsideClick(outSideRef, onClickOutside);

  const refInitial = (instance: HTMLDivElement) => {
    //@ts-ignore
    outSideRef.current = instance;
  };

  const { values, errors, handleSubmit, handleChange } = useCreateOrder();

  const onClickReturn = () => {
    batch(() => {
      dispatch(closeOrdersModal());
      dispatch(openBasketAction());
    });
  };

  return (
    <ReactModal contentRef={refInitial} style={customStyles} isOpen={isOpen}>
      <div className={classNames["order-complete"]}>
        <div className={classNames["order-complete__header"]}>
          <div className={classNames["order-complete__container"]}>
            <div className={classNames["order-complete__header__wrapper"]}>
              <div className={classNames["order-complete__header__logo"]}>
                <Logo />
              </div>
              <div className={classNames["order-complete__header__buttons"]}>
                <button
                  onClick={onClickReturn}
                  className={classNames["order-complete__header__button"]}
                >
                  <span>Вернуться к корзине</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames["order-complete__content"]}>
          <div className={classNames["order-complete__container__content"]}>
            <div className={classNames["order-complete__details"]}>
              <h3 className={classNames["order-complete__title"]}>
                Проверьте данные вашего заказа
              </h3>
              <Details />
              <Address
                {...values}
                handleChange={handleChange}
                errors={errors}
              />
              <div className={classNames["order-complete__button__container"]}>
                <UserButton onClick={() => handleSubmit()}>
                  Оформить заказ
                </UserButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default OrderComplete;
