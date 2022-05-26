import React, {
  ChangeEvent,
  FC,
  forwardRef,
  HTMLInputTypeAttribute,
} from "react";
import classNames from "./index.module.scss";

interface UserInputProps {
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  name?: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UserInput = forwardRef<HTMLInputElement, UserInputProps>(
  ({ placeholder = "", type = "text", value, name, error, onChange }, ref) => {
    return (
      <div ref={ref} className={classNames["user-input_container"]}>
        <input
          name={name}
          value={value}
          placeholder={placeholder}
          className={
            error
              ? classNames["user-input_container__input__error"]
              : classNames["user-input_container__input"]
          }
          type={type}
          onChange={onChange}
        />
        {error && (
          <span className={classNames["user-input_container__error__text"]}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default UserInput;
