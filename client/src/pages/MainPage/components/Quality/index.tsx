import React, { FC } from "react";
import classNames from "./index.module.scss";

interface QualityProps {}

const Quality: FC<QualityProps> = () => {
  return (
    <div className={classNames.quality}>
      <div className="container">
        <div className={classNames["quality__wrapper"]}>
          <div className={classNames["quality__container"]}>
            <div className={classNames["quality__image_1"]} />
            <div className={classNames["quality__description__wrapper"]}>
              <div className={classNames["quality__description"]}>
                <h3
                  className={`${classNames["quality__title"]} ${classNames["quality__title_circle_full"]}`}
                >
                  Полезно
                </h3>
                <span className={classNames["quality__text"]}>
                  Наши продукты изготавливаются из полезных ингредиентов,
                  которые всегда четко маркированы. Мы предлагаем органические
                  продукты, не содержащие ГМО, с большим количеством веганских
                  и безглютеновых блюд.
                </span>
              </div>
            </div>
          </div>
          <div className={classNames["quality__container"]}>
            <div className={classNames["quality__description__wrapper"]}>
              <div className={classNames["quality__description"]}>
                <h3
                  className={`${classNames["quality__title"]} ${classNames["quality__title_circle_partial"]}`}
                >
                  Устойчиво
                </h3>
                <span className={classNames["quality__text"]}>
                  Наши упаковки сделаны из сахарного тростника. Мы поставляем
                  биоразлагаемые альтернативы одноразовому пластику. Наши
                  бумажные изделия не содержат дерева.
                </span>
              </div>
            </div>
            <div className={classNames["quality__image_2"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quality;
