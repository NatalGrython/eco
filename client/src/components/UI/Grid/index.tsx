import React, { FC } from "react";
import classNames from "./index.module.scss";

interface GridProps<T> {
  rowGap: string;
  items: T[];
  component: FC<T>;
  keyExtractor(item: T): string | number;
}

function Grid<T>({ rowGap, items, component, keyExtractor }: GridProps<T>) {
  const Component = component;
  return (
    <div className={classNames.grid}>
      <div className="container">
        <div
          className={classNames["grid__wrapper"]}
          style={{ gridRowGap: rowGap }}
        >
          {items.map((item) => (
            <Component key={keyExtractor(item)} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Grid;
