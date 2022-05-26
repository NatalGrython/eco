import React, { ChangeEvent, FC } from "react";
import { Search } from "../../../icons";
import classNames from "./index.module.scss";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  const innerOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={classNames.search_input}>
      <div className={classNames.search_input_icon_container}>
        <Search />
      </div>
      <input
        value={value}
        onChange={innerOnChange}
        className={classNames.search_input__input}
        type="text"
      />
    </div>
  );
};

export default SearchInput;
