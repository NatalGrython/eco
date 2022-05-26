import React, { FC } from "react";
import classNames from "./index.module.scss";

interface MainProps {}

const Main: FC<MainProps> = () => {
  return (
    <div className={classNames.main}>
      <div className="container">
        <div className={classNames["main__wrapper"]}>
          <div className={classNames["main__content"]}>
            <h2 className={classNames["main__title"]}>
              Вам не нужно быть супергероем, чтобы спасти нашу планету
            </h2>
            <span className={classNames["main__description"]}>
              Мы стремимся сделать более здоровый, осознанный выбор легким и
              доступным для всех
            </span>
            <button className={classNames["main__button"]}>
              <span>Перейти в каталог</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
