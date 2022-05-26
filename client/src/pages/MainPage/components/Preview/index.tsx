import React, { FC } from "react";
import classNames from "./index.module.scss";

interface PreviewProps {}

const Preview: FC<PreviewProps> = () => {
  return (
    <div className={classNames.preview}>
      <div className="container">
        <div className={classNames["preview__wrapper"]}>
          <div className={classNames["preview__description"]}>
            <h2 className={classNames["preview__title"]}>
              Откройте себя заново
            </h2>
            <span className={classNames["preview__text"]}>
              Обновите свою повседневную рутину с помощью нашей полезной
              коллекции средств личной гигиены
            </span>
            <button className={classNames["preview__button"]}>
              <span>Смотреть товары</span>
            </button>
          </div>
          <div className={classNames["preview__image"]} />
        </div>
      </div>
    </div>
  );
};

export default Preview;
