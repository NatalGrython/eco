import React, { ChangeEvent, FC, useRef, useState } from "react";
import Product, { ProductProps } from "../Product";
import classNames from "./index.module.scss";

import Carousel, { CarouselRef } from "../UI/Carousel";
import {
  CarouselArrowLeft,
  CarouselArrowRight,
  Delete,
  Edit,
} from "../../icons";
import { useOutsideClick } from "../../hooks";
import UserInput from "../UI/UserInput";
import { useDispatch } from "react-redux";
import {
  deleteCatalogAction,
  updateCatalogAction,
} from "../../store/catalog/action";

interface ChooseProps {
  title?: string;
  editable?: boolean;
  items: ProductProps[];
  catalogId?: number;
}

const Choose: FC<ChooseProps> = ({
  title = "Выбор поситителей",
  editable,
  items,
  catalogId,
}) => {
  const [edit, setEdit] = useState(false);
  const contentRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(title);
  const dispatch = useDispatch();

  useOutsideClick(contentRef, () => {
    setEdit(false);
    if (catalogId) {
      dispatch(updateCatalogAction({ id: catalogId, name: value }));
    }
  });

  const editCatalogValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onDeleteCatalog = () => {
    if (catalogId) {
      dispatch(deleteCatalogAction(catalogId));
    }
  };

  const sliderRef = useRef<CarouselRef>(null);

  const onPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.previous();
    }
  };

  const onNext = () => {
    if (sliderRef.current) {
      sliderRef.current.next();
    }
  };

  if (items.length <= 3) {
    return (
      <div className={classNames.choose}>
        <div className="container">
          <div className={classNames["choose__wrapper"]}>
            <div className={classNames.choose__title__container}>
              {edit ? (
                <UserInput
                  ref={contentRef}
                  value={value}
                  onChange={editCatalogValue}
                  placeholder="Добавить имя категории"
                  type="text"
                />
              ) : (
                <h2 className={classNames["choose__title"]}>{title}</h2>
              )}
              {editable && (
                <div className={classNames.choose__button_container}>
                  <button
                    onClick={() => {
                      setEdit(true);
                    }}
                    className={classNames.choose__edit__button}
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => {
                      onDeleteCatalog();
                    }}
                    className={classNames.choose__delete__button}
                  >
                    <Delete />
                  </button>
                </div>
              )}
            </div>
            <div className={classNames.choose__three_container}>
              {items.map((item) => (
                <Product key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames.choose}>
      <button
        className={classNames["choose__arrow__left"]}
        onClick={onPrevious}
      >
        <CarouselArrowLeft />
      </button>
      <div className="container">
        <div className={classNames["choose__wrapper"]}>
          <div className={classNames.choose__title__container}>
            {edit ? (
              <UserInput
                ref={contentRef}
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
                placeholder="Добавить имя категории"
                type="text"
              />
            ) : (
              <h2 className={classNames["choose__title"]}>{title}</h2>
            )}
            {editable && (
              <div className={classNames.choose__button_container}>
                <button
                  onClick={() => {
                    setEdit(true);
                  }}
                  className={classNames.choose__edit__button}
                >
                  <Edit />
                </button>
                <button
                  onClick={() => {
                    onDeleteCatalog();
                  }}
                  className={classNames.choose__delete__button}
                >
                  <Delete />
                </button>
              </div>
            )}
          </div>
          <Carousel
            ref={sliderRef}
            items={items}
            keyExtractor={(item) => item.id}
            component={Product}
          />
        </div>
      </div>
      <button className={classNames["choose__arrow__right"]} onClick={onNext}>
        <CarouselArrowRight />
      </button>
    </div>
  );
};

export default Choose;
