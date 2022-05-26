import React, { ChangeEvent, FC, forwardRef, MutableRefObject } from "react";
import classNames from "./index.module.scss";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Error as ErrorIcon } from "../../../icons";

interface AdminInputProps {
  value: string | number;
  name?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const PopupButton = forwardRef((props, ref) => {
  return (
    <div
      ref={ref as MutableRefObject<HTMLDivElement>}
      {...props}
      className={classNames["admin-input__error_container"]}
    >
      <ErrorIcon />
    </div>
  );
});

const AdminInput: FC<AdminInputProps> = ({
  value,
  name,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className={classNames["admin-input"]}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={
          error
            ? classNames["admin-input__input__error"]
            : classNames["admin-input__input"]
        }
      />

      {error && (
        <Popup
          position="right center"
          closeOnDocumentClick
          trigger={<PopupButton />}
          contentStyle={{
            backgroundColor: "black",
          }}
          arrowStyle={{
            color: "black",
          }}
          on={["hover"]}
        >
          <span className={classNames["admin-input__error"]}>{error}</span>
        </Popup>
      )}
    </div>
  );
};

export default AdminInput;
