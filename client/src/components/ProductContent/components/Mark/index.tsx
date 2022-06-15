import React, { FC } from "react";
import list from "@images/list.png";
import eco from "@images/eco.png";
import quality from "@images/quality.png";
import bear from "@images/bear.png";
import fork from "@images/fork.png";
import vegan from "@images/vegan.png";
import animal from "@images/animal.png";
import classNames from "./index.module.scss";

const images: { [key: string]: string } = {
  list,
  eco,
  quality,
  bear,
  animal,
  fork,
  vegan,
};

interface MarkProps {
  markType: string;
}

const Mark: FC<MarkProps> = ({ markType }) => {
  return markType === "" ? null : (
    <div
      className={classNames.mark}
      style={{ backgroundImage: `url("${images[markType]}")` }}
    ></div>
  );
};

export default Mark;
