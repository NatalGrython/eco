import { useFormik } from "formik";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserButton from "../../../../components/UI/UserButton";
import UserInput from "../../../../components/UI/UserInput";
import { RootState } from "../../../../store";
import { updateUserAction } from "../../../../store/user/action";
import { useUpdateUserInfo } from "./hooks/useUpdateUser";
import classNames from "./index.module.scss";

interface AccountUserPage {}

const userSelector = (state: RootState) => state.user.user;

const AccountUserPage: FC<AccountUserPage> = () => {
  const user = useSelector(userSelector);
  const { values, errors, handleChange, handleSubmit } =
    useUpdateUserInfo(user);

  if (!user) {
    return null;
  }

  return (
    <div className={classNames.account}>
      <h2 className={classNames.account__title}>Аккаунт</h2>
      <div className={classNames.account__input__content}>
        <UserInput
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
          type="text"
          error={errors.name}
        />
        <UserInput
          name="surname"
          value={values.surname}
          onChange={handleChange}
          placeholder="Фамилия"
          type="text"
          error={errors.surname}
        />
        <UserInput
          name="patronymic"
          value={values.patronymic}
          onChange={handleChange}
          placeholder="Отчество"
          type="text"
          error={errors.patronymic}
        />
        <UserInput
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Электронная почта"
          type="email"
          error={errors.email}
        />
      </div>
      <div className={classNames.account__input__content}>
        <UserInput
          name="address"
          value={values.address}
          onChange={handleChange}
          placeholder="Адрес доставки"
          type="text"
          error={errors.address}
        />
        <div className={classNames.account__input__row}>
          <UserInput
            name="entrance"
            value={values.entrance}
            onChange={handleChange}
            placeholder="Подъезд"
            type="text"
            error={errors.entrance}
          />
          <UserInput
            name="intercom"
            value={values.intercom}
            onChange={handleChange}
            placeholder="Домофон"
            type="text"
            error={errors.intercom}
          />
        </div>
        <div className={classNames.account__input__row}>
          <UserInput
            name="flat"
            value={values.flat}
            onChange={handleChange}
            placeholder="Квартира"
            type="text"
            error={errors.flat}
          />
          <UserInput
            name="floor"
            value={values.floor}
            onChange={handleChange}
            placeholder="Этаж"
            type="text"
            error={errors.floor}
          />
        </div>
        <UserInput
          name="comment"
          value={values.comment}
          onChange={handleChange}
          placeholder="Комментарий"
          type="text"
          error={errors.comment}
        />
      </div>
      <UserButton onClick={() => handleSubmit()}>Сохранить</UserButton>
    </div>
  );
};

export default AccountUserPage;
