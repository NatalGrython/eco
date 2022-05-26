import React, { FC } from "react";
import { Google } from "../../../../icons";
import classNames from "./index.module.scss";

interface GoogleAuthButtonProps {}

const GoogleAuthButton: FC<GoogleAuthButtonProps> = () => {
  return (
    <button className={`g-signin2 ${classNames.google__button}`}>
      <Google />
      <span>Войти через Google</span>
    </button>
  );
};

export default GoogleAuthButton;
