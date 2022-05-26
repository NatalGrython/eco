import React, { ChangeEvent, FC } from "react";
import classNames from "./index.module.scss";

interface AdminTextAreaProps {
  value: string | number;
  name?: string;
  onChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
}

const AdminTextArea: FC<AdminTextAreaProps> = ({
  onChange,
  placeholder,
  name,
  error,
  value,
}) => {
  return (
    <div className={classNames["admin-textarea"]}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={
          error
            ? classNames["admin-textarea__input__error"]
            : classNames["admin-textarea__input"]
        }
      />

      {error && (
        <span className={classNames["admin-textarea__error"]}>{error}</span>
      )}
    </div>
  );
};

export default AdminTextArea;
