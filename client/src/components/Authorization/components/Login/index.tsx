import React, { FC } from "react";
import UserButton from "../../../UI/UserButton";
import UserInput from "../../../UI/UserInput";
import GoogleAuthButton from "../GoogleAuthButton";
import VkAuthButton from "../VKAuthButton";
import { useLogin } from "./hooks/useLogin";
import classNames from "./index.module.scss";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { values, errors, handleChange, handleSubmit } = useLogin();

  return (
    <div className={classNames.login}>
      <h2 className={classNames.login__title}>Вход</h2>
      <div className={classNames.login__inputs}>
        <UserInput
          error={errors.login}
          name="login"
          onChange={handleChange}
          value={values.login}
          placeholder="Введите логин"
        />
        <UserInput
          error={errors.password}
          name="password"
          onChange={handleChange}
          value={values.password}
          placeholder="Введите пароль"
          type="password"
        />
      </div>
      <div className={classNames.login__button__container}>
        <UserButton onClick={() => handleSubmit()}>Войти</UserButton>
        <span className={classNames.login__text}>
          У вас еще нет аккаунта?{" "}
          <span className={classNames.login__text__bold}>
            Зарегистрироваться
          </span>
        </span>

        <VkAuthButton />
        <GoogleAuthButton />
      </div>
    </div>
  );
};

export default Login;
