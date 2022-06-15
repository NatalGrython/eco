import React, { ChangeEvent, FC } from "react";
import classNames from "./index.module.scss";

interface AdminSelectProps {
  options: { text: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

const AdminSelect: FC<AdminSelectProps> = ({ options, value, onChange }) => {
  const innerOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };
  return (
    <select
      className={classNames.select}
      value={value}
      onChange={innerOnChange}
    >
      {options.map((item) => (
        <option value={item.value}>{item.text}</option>
      ))}
    </select>
  );
};

export default AdminSelect;
