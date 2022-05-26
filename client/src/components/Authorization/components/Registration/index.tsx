import { Formik, useFormik } from "formik";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registrationStartedAction } from "../../../../store/auth/actions";
import UserButton from "../../../UI/UserButton";
import UserInput from "../../../UI/UserInput";
import classNames from "./index.module.scss";
import { object, string, ref } from "yup";
import { useRegistration } from "./hooks/useRegistration";

interface RegistrationProps {}

const Registration: FC<RegistrationProps> = () => {
  const { values, errors, handleChange, handleSubmit } = useRegistration();

  return (
    <div className={classNames.registration}>
      <h2 className={classNames.registration__title}>Регистрация</h2>

      <div className={classNames.registration__inputs}>
        <UserInput
          error={errors.login}
          name="login"
          onChange={handleChange}
          value={values.login}
          placeholder="Введите логин"
          type="text"
        />
        <UserInput
          error={errors.password}
          name="password"
          onChange={handleChange}
          value={values.password}
          placeholder="Введите пароль"
          type="password"
        />
        <UserInput
          error={errors.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          value={values.confirmPassword}
          placeholder="Повторите пароль"
          type="password"
        />
      </div>
      <div className={classNames.registration__button__container}>
        <UserButton onClick={() => handleSubmit()}>
          Зарегистрироваться
        </UserButton>
        <span className={classNames.registration__text}>
          Уже есть аккаунт?{" "}
          <span className={classNames.registration__text__bold}>Войти</span>
        </span>
      </div>
    </div>
  );
};

export default Registration;
