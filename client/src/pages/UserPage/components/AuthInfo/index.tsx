import React, { FC } from "react";
import UserButton from "../../../../components/UI/UserButton";
import UserInput from "../../../../components/UI/UserInput";
import classNames from "./index.module.scss";

interface AuthInfoUserPageProps {}

const AuthInfoUserPage: FC<AuthInfoUserPageProps> = () => {
  return (
    <div className={classNames["auth-info"]}>
      <h2 className={classNames["auth-info__title"]}>Авторизационные данные</h2>
      <div className={classNames["auth-info__input__content"]}>
        <UserInput
          value={""}
          onChange={() => {}}
          placeholder="Логин"
          type="text"
        />
        <UserInput
          value={""}
          onChange={() => {}}
          placeholder="Введите старый пароль"
          type="password"
        />
        <UserInput
          value={""}
          onChange={() => {}}
          placeholder="Введите новый пароль"
          type="password"
        />
        <UserInput
          value={""}
          onChange={() => {}}
          placeholder="Повторите новый пароль"
          type="password"
        />
      </div>
      <UserButton onClick={() => {}}>Обновить данные</UserButton>
    </div>
  );
};

export default AuthInfoUserPage;
