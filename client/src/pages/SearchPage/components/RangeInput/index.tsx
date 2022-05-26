import React, { ChangeEvent, FC } from "react";
import classNames from "./index.module.scss";

interface RangeInputProps {
  title?: string;
  value: [string, string];
  onChange: (value: [string, string]) => void;
}

const RangeInput: FC<RangeInputProps> = ({ title, value, onChange }) => {
  const onChangeLeft = (event: ChangeEvent<HTMLInputElement>) => {
    onChange([event.target.value, value[1]]);
  };

  const onChangeRight = (event: ChangeEvent<HTMLInputElement>) => {
    onChange([value[0], event.target.value]);
  };

  return (
    <div className={classNames.range}>
      {title && <span className={classNames.text}>{title}</span>}
      <div className={classNames.range_container}>
        <span className={classNames.text}>от</span>
        <input
          value={value[0]}
          onChange={onChangeLeft}
          className={classNames.input}
          type="text"
        />
        <span className={classNames.text}>до</span>
        <input
          value={value[1]}
          onChange={onChangeRight}
          className={classNames.input}
          type="text"
        />
      </div>
    </div>
  );
};

export default RangeInput;
