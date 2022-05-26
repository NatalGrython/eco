import React, { FC } from "react";
import AdminInput from "../UI/AdminInput";
import classNames from "./index.module.scss";

type EnergyContainerProps =
  | EnergyContainerCreateProps
  | EnergyContainerContentProps;

interface EnergyContainerCreateProps {
  edited: true;
  errors: {
    calories?: string;
    proteins?: string;
    fats?: string;
    carbohydrates?: string;
  };
  values: {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
  };
  onChange: (event: any) => void;
}

interface EnergyContainerContentProps {
  edited?: undefined;
  values: {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
  };
}

const EnergyContainer: FC<EnergyContainerProps> = (props) => {
  const { edited, values } = props;

  if (edited) {
    const { onChange, errors } = props;
    return (
      <div className={classNames["energy"]}>
        <div className={classNames["energy__container"]}>
          <div className={classNames["energy__component"]}>
            <h3 className={classNames["energy__title"]}>
              Энергетическая и пищевая ценность ( 100 г)
            </h3>
            <div className={classNames["energy__text__container"]}>
              <div className={classNames.energy__input_container}>
                <span className={classNames["energy__text"]}>
                  Калорийность:
                </span>
                <div className={classNames.energy_input}>
                  <AdminInput
                    name="calories"
                    value={values.calories}
                    onChange={onChange}
                    error={errors.calories}
                  />
                </div>
              </div>
              <div className={classNames.energy__input_container}>
                <span className={classNames["energy__text"]}>Белки:</span>
                <div className={classNames.energy_input}>
                  <AdminInput
                    name="proteins"
                    value={values.proteins}
                    onChange={onChange}
                    error={errors.proteins}
                  />
                </div>
              </div>
              <div className={classNames.energy__input_container}>
                <span className={classNames["energy__text"]}>Жиры:</span>
                <div className={classNames.energy_input}>
                  <AdminInput
                    name="fats"
                    value={values.fats}
                    onChange={onChange}
                    error={errors.fats}
                  />
                </div>
              </div>
              <div className={classNames.energy__input_container}>
                <span className={classNames["energy__text"]}>Углеводы:</span>
                <div className={classNames.energy_input}>
                  <AdminInput
                    name="carbohydrates"
                    value={values.carbohydrates}
                    onChange={onChange}
                    error={errors.carbohydrates}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames["energy"]}>
      <div className={classNames["energy__container"]}>
        <div className={classNames["energy__component"]}>
          <h3 className={classNames["energy__title"]}>
            Энергетическая и пищевая ценность ( 100 г)
          </h3>
          <div className={classNames["energy__text__container"]}>
            <span className={classNames["energy__text"]}>
              Калорийность: {values.calories} кКал
            </span>
            <span className={classNames["energy__text"]}>
              Белки: {values.proteins} г
            </span>
            <span className={classNames["energy__text"]}>
              Жиры: {values.fats} г
            </span>
            <span className={classNames["energy__text"]}>
              Углеводы: {values.carbohydrates} г
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyContainer;
