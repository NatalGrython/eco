import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Cart, Search, User } from "../../icons";
import { RootState } from "../../store";
import { logoutAction } from "../../store/auth/actions";
import { openAction } from "../../store/auth/actions";
import { openBasketAction } from "../../store/basket/action";
import Basket from "../Basket";
import classNames from "./index.module.scss";
import Logo from "./Logo";

interface HeaderProps {}

const headerTypeSelector = (state: RootState) => ({
  type: state.routes.type,
  user: state.user.user,
  basketProductsNumber: state.basket.products.length,
});

const Header: FC<HeaderProps> = () => {
  const { type, user, basketProductsNumber } = useSelector(headerTypeSelector);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const onClickAuth = () => dispatch(openAction());

  const onClickBasket = () => dispatch(openBasketAction());

  const onClickMyPage = () => {
    if (user) {
      navigation(`/user/${user.id}/account`);
    }
  };

  const onLogout = () => {
    dispatch(logoutAction());
    navigation("/");
  };
  const onClickSearch = () => {
    navigation("/search");
  };

  return (
    <>
      <div className={classNames.header}>
        <div className="container">
          <div className={classNames["header__wrapper"]}>
            <div className={classNames.logo}>
              <Link to="/">
                <Logo />
              </Link>
            </div>
            {type !== "admin" && (
              <div className={classNames.links}>
                <Link className={classNames.link} to="/catalog">
                  Каталог
                </Link>
                <Link className={classNames.link} to="/favorite">
                  Избранное
                </Link>
              </div>
            )}
            <div className={classNames.actions}>
              {type === "admin" && (
                <>
                  <Link
                    className={classNames.link}
                    to={type !== "admin" ? "/orders" : "/orders"}
                  >
                    Заказы
                  </Link>
                  <Link
                    className={classNames.link}
                    to={type !== "admin" ? "/catalog" : "/"}
                  >
                    Каталог
                  </Link>
                </>
              )}
              {type === "default" ? (
                <div onClick={onClickAuth} className={classNames.action}>
                  <User />
                  <span className={classNames["action__text"]}>Войти</span>
                </div>
              ) : (
                <>
                  {type !== "admin" && (
                    <div onClick={onClickMyPage} className={classNames.action}>
                      <User />
                      <span className={classNames["action__text"]}>
                        Моя страница
                      </span>
                    </div>
                  )}
                  <div onClick={onLogout} className={classNames.action}>
                    <span className={classNames["action__text"]}>Выйти</span>
                  </div>
                </>
              )}
              {type !== "admin" && (
                <>
                  <div onClick={onClickSearch} className={classNames.action}>
                    <Search />
                    <h2 className={classNames["action__text"]}>Поиск</h2>
                  </div>
                  <div onClick={onClickBasket} className={classNames.action}>
                    <Cart />
                    <span className={classNames["action__text"]}>
                      {basketProductsNumber}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Basket />
    </>
  );
};

export default Header;
