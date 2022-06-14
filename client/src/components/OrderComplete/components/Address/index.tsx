import React, { ChangeEvent, FC } from "react";
import UserInput from "../../../UI/UserInput";
import classNames from "./index.module.scss";

interface AddressProps {
  address: string;
  entrance: string;
  intercom: string;
  flat: string;
  floor: string;
  comment: string;
  phone: string;
  errors: {
    address?: string;
    entrance?: string;
    intercom?: string;
    flat?: string;
    floor?: string;
    comment?: string;
    phone?: string;
  };
  handleChange: (event: ChangeEvent) => void;
}

const Address: FC<AddressProps> = ({
  address,
  entrance,
  intercom,
  flat,
  floor,
  comment,
  phone,
  handleChange,
  errors,
}) => {
  return (
    <div className={classNames.address}>
      <UserInput
        name="address"
        value={address}
        onChange={handleChange}
        placeholder="Адрес доставки"
        error={errors.address}
        type="text"
      />
      <div className={classNames.address__content}>
        <UserInput
          name="entrance"
          value={entrance}
          onChange={handleChange}
          placeholder="Подъезд"
          type="text"
          error={errors.entrance}
        />
        <UserInput
          name="intercom"
          value={intercom}
          onChange={handleChange}
          placeholder="Домофон"
          type="text"
          error={errors.intercom}
        />
      </div>
      <div className={classNames.address__content}>
        <UserInput
          name="flat"
          value={flat}
          onChange={handleChange}
          placeholder="Квартира"
          type="text"
          error={errors.flat}
        />
        <UserInput
          name="floor"
          value={floor}
          onChange={handleChange}
          placeholder="Этаж"
          type="text"
          error={errors.floor}
        />
      </div>
      <UserInput
        name="comment"
        value={comment}
        onChange={handleChange}
        placeholder="Комментарий"
        type="text"
        error={errors.comment}
      />
      <UserInput
        name="phone"
        value={phone}
        onChange={handleChange}
        placeholder="Номер телефона для связи"
        type="tel"
        error={errors.phone}
      />
    </div>
  );
};

export default Address;
