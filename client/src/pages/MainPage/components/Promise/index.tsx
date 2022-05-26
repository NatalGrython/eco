import React, { FC } from "react";
import classNames from "./index.module.scss";

interface PromiseProps {}

const Promise: FC<PromiseProps> = () => {
  return (
    <div className={classNames.promise}>
      <div className="container">
        <div className={classNames["promise__wrapper"]}>
          <div className={classNames["promise__container"]}>
            <h2 className={classNames["promise__title"]}>Мы обещаем</h2>
            <span className={classNames["promise__text"]}>
              Экологически чистые материалы. Полезные ингредиенты. Красивый
              дизайн. И все это по справедливой цене.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promise;
