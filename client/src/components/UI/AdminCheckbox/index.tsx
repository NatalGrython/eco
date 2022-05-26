import React, { ChangeEvent, FC } from "react";
import classNames from "./index.module.scss";

interface AdminCheckboxProps {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const AdminCheckbox: FC<AdminCheckboxProps> = ({
  title,
  checked,
  onChange,
}) => {
  const innerOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={classNames.checkbox}>
      <input
        checked={checked}
        onChange={innerOnChange}
        className={classNames.checkbox__input}
        type="checkbox"
        name=""
        id=""
      />
      <span className={classNames.checkbox__title}>{title}</span>
    </div>
  );
};

export default AdminCheckbox;
