import React, { ChangeEvent, FC } from "react";
import { Search, Setting } from "../../../../icons";
import classNames from "./index.module.scss";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/core.css";
import { useSelector } from "react-redux";
import { catalogsSelector } from "../../../../store/selectors";
import AdminCheckbox from "../../../../components/UI/AdminCheckbox";
import RangeInput from "../RangeInput";
import { useFilters } from "../../../AdminOredersPage/components/Main/hooks/useFilters";

interface SearchInputWithMenuProps {
  value: string;
  onChange: (value: string) => void;
  filter: {
    catalogs: number[];
    calories: [string, string];
    fats: [string, string];
    proteins: [string, string];
    carbohydrates: [string, string];
    price: [string, string];
  };
  onChangeFilter: (filter: {
    catalogs: number[];
    calories: [string, string];
    fats: [string, string];
    proteins: [string, string];
    carbohydrates: [string, string];
    price: [string, string];
  }) => void;
}

const SearchInputWithMenu: FC<SearchInputWithMenuProps> = ({
  value,
  onChange,
  filter,
  onChangeFilter,
}) => {
  const innerOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const { catalogs } = useSelector(catalogsSelector);

  const onChangeRange = (type: string) => (value: [string, string]) => {
    onChangeFilter({ ...filter, [type]: value });
  };

  const checkedValue = (id: number) => filter.catalogs.includes(id);

  const onChangeCheckedValue = (id: number) => (checked: boolean) => {
    if (checked) {
      onChangeFilter({ ...filter, catalogs: [...filter.catalogs, id] });
    } else {
      onChangeFilter({
        ...filter,
        catalogs: filter.catalogs.filter((item) => item !== id),
      });
    }
  };

  return (
    <div className={classNames.search_input}>
      <div className={classNames.search_input_icon_container_left}>
        <Search />
      </div>
      <input
        value={value}
        onChange={innerOnChange}
        className={classNames.search_input__input}
        type="text"
      />
      <Menu
        menuButton={
          <div className={classNames.search_input_icon_container_right}>
            <Setting />
          </div>
        }
        direction="bottom"
        align="end"
      >
        <div className={classNames.menu}>
          <div className={classNames.menu__content}>
            <div className={classNames.menu__catalogs}>
              <div className={classNames.menu__container}>
                <div className={classNames.menu__catalogs__wrapper}>
                  <span className={classNames.menu__title}>Категория</span>
                  <div className={classNames.menu__catalogs__content}>
                    {catalogs.map((item) => (
                      <AdminCheckbox
                        onChange={onChangeCheckedValue(item.id)}
                        checked={checkedValue(item.id)}
                        key={item.id}
                        title={item.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={classNames.menu__energy}>
              <div className={classNames.menu__container}>
                <div className={classNames.menu__catalogs__content}>
                  <span className={classNames.menu__title}>
                    Энергетическая и пищевая ценность
                  </span>
                  <div className={classNames.menu__catalogs__wrapper}>
                    <RangeInput
                      onChange={onChangeRange("calories")}
                      value={filter.calories}
                      title="Ккал:"
                    />
                    <RangeInput
                      onChange={onChangeRange("proteins")}
                      value={filter.proteins}
                      title="Белки:"
                    />
                    <RangeInput
                      onChange={onChangeRange("fats")}
                      value={filter.fats}
                      title="Жиры:"
                    />
                    <RangeInput
                      onChange={onChangeRange("carbohydrates")}
                      value={filter.carbohydrates}
                      title="Углеводы:"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classNames.menu__price}>
              <div className={classNames.menu__container}>
                <div className={classNames.menu__price__content}>
                  <span className={classNames.menu__title}>Цена</span>
                  <div className={classNames.menu__price__wrapper}>
                    <RangeInput
                      onChange={onChangeRange("price")}
                      value={filter.price}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Menu>
    </div>
  );
};

export default SearchInputWithMenu;
