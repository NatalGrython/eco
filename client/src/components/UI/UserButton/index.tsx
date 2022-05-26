import React, { FC, MouseEvent } from "react";
import classNames from "./index.module.scss";

interface UserButtonProps {
  children: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const UserButton: FC<UserButtonProps> = ({ children, onClick }) => {
  return (
    <button type="button" onClick={onClick} className={classNames.button}>
      <span>{children}</span>
    </button>
  );
};

export default UserButton;
