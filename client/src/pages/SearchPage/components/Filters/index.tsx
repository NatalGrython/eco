import React, { FC } from "react";
import SearchInputWithMenu from "../FilterInput";
import classNames from "./index.module.scss";
import { useFilters } from "../../hooks";

interface SearchFiltersProps {}

const SearchFilters: FC<SearchFiltersProps> = () => {
  const { search, onChangeSearch, filter, onChangeFilter, sort, onChangeSort } =
    useFilters();
  return (
    <div className={classNames.filters}>
      <div className="container">
        <div className={classNames.filters__content}>
          <SearchInputWithMenu
            onChangeFilter={onChangeFilter}
            filter={filter}
            value={search}
            onChange={onChangeSearch}
          />
          <div className={classNames.filters__sort}>
            <span className={classNames.filters__sort__title}>
              Сортировать:
            </span>
            <button
              onClick={onChangeSort("popular")}
              className={
                sort === "popular"
                  ? classNames.filters__sort__button__active
                  : classNames.filters__sort__button
              }
            >
              по популярности
            </button>
            <button
              onClick={onChangeSort("price")}
              className={
                sort === "price"
                  ? classNames.filters__sort__button__active
                  : classNames.filters__sort__button
              }
            >
              по цене
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
