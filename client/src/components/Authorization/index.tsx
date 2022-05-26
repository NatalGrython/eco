import React, { FC, useRef, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Logo from "../Header/Logo";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { useOutsideClick } from "../../hooks";
import classNames from "./index.module.scss";
import { closeAction } from "../../store/auth/actions";

interface AuthorizationProps {}

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

const selector = (state: RootState) => state.auth.modalIsOpen;

ReactModal.setAppElement("#auth");

const Authorization: FC<AuthorizationProps> = () => {
  const [authType, setAuthType] = useState<"auth" | "login">("login");
  const outSideRef = useRef<HTMLElement>(null);
  const isOpen = useSelector(selector);
  const dispatch = useDispatch();

  const onChangeType = (type: "auth" | "login") => () => setAuthType(type);

  const onClickOutside = () => dispatch(closeAction());

  useOutsideClick(outSideRef, onClickOutside);

  const refInitial = (instance: HTMLDivElement) => {
    //@ts-ignore
    outSideRef.current = instance;
  };

  return (
    <ReactModal contentRef={refInitial} style={customStyles} isOpen={isOpen}>
      <div className={classNames.basket}>
        <div className={classNames.basket__header}>
          <div className={classNames.basket__container}>
            <div className={classNames.basket__header__wrapper}>
              <div className={classNames.basket__header__logo}>
                <Logo />
              </div>
              <div className={classNames.basket__header__buttons}>
                <button
                  onClick={onChangeType("login")}
                  className={
                    authType === "login"
                      ? classNames.basket__header__button__active
                      : classNames.basket__header__button
                  }
                >
                  <span>Войти</span>
                </button>
                <button
                  onClick={onChangeType("auth")}
                  className={
                    authType === "auth"
                      ? classNames.basket__header__button__active
                      : classNames.basket__header__button
                  }
                >
                  <span>Зарегистрироваться</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames.basket__content}>
          <div className={classNames.basket__container}>
            {authType === "auth" ? <Registration /> : <Login />}
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default Authorization;
