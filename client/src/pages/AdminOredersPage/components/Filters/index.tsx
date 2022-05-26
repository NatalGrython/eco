import React, { FC } from "react";
import SearchInput from "../../../../components/UI/SearchInput";
import { useFilters } from "../Main/hooks/useFilters";
import classNames from "./index.module.scss";

interface FiltersProps {}

const Filters: FC<FiltersProps> = () => {
  const { search, onChangeSearch, filter, sort, onChangeFilter, onChangeSort } =
    useFilters();
  return (
    <div className={classNames.filters}>
      <div className="container">
        <div className={classNames.filters__wrapper}>
          <div className={classNames.filters__title__container}>
            <h2 className={classNames.filters__title}>Заказы</h2>
            <div className={classNames.filters__input__container}>
              <SearchInput value={search} onChange={onChangeSearch} />
            </div>
          </div>
          <div className={classNames.filters__buttons}>
            <button
              onClick={onChangeFilter("all")}
              className={
                filter === "all"
                  ? classNames.filters__button__active
                  : classNames.filters__button
              }
            >
              <span>Все заказы</span>
            </button>
            <button
              onClick={onChangeFilter("InProgress")}
              className={
                filter === "InProgress"
                  ? classNames.filters__button__active
                  : classNames.filters__button
              }
            >
              <span>Новые заказы</span>
            </button>
            <button
              onClick={onChangeFilter("Assembled")}
              className={
                filter === "Assembled"
                  ? classNames.filters__button__active
                  : classNames.filters__button
              }
            >
              <span>Собранные заказы</span>
            </button>
            <button
              onClick={onChangeFilter("AtTheCourier")}
              className={
                filter === "AtTheCourier"
                  ? classNames.filters__button__active
                  : classNames.filters__button
              }
            >
              <span>Заказы у курьера</span>
            </button>
            <button
              onClick={onChangeFilter("Delivered")}
              className={
                filter === "Delivered"
                  ? classNames.filters__button__active
                  : classNames.filters__button
              }
            >
              <span>Доставленные заказы</span>
            </button>
            <button
              onClick={onChangeFilter("Canceled")}
              className={
                filter === "Canceled"
                  ? classNames.filters__button__active
                  : classNames.filters__button
              }
            >
              <span>Отмененные заказы</span>
            </button>
          </div>
          <div className={classNames.filters__sort}>
            <span className={classNames.filters__sort__title}>
              Сортировать:
            </span>
            <button
              onClick={onChangeSort("asc")}
              className={
                sort === "asc"
                  ? classNames.filters__sort__button__active
                  : classNames.filters__sort__button
              }
            >
              от старого к новому
            </button>
            <button
              onClick={onChangeSort("desc")}
              className={
                sort === "desc"
                  ? classNames.filters__sort__button__active
                  : classNames.filters__sort__button
              }
            >
              от нового к старому
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
