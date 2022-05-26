import React, { FC } from "react";
import classNames from "./index.module.scss";
import img from "@images/preview.png";
import { dynamicImageStyles } from "../../utils/dynamicImage";

interface PreviewProps {
  imagePath?: string;
  title?: string;
}

const Preview: FC<PreviewProps> = ({ imagePath = img, title = "Каталог" }) => {
  return (
    <div className={classNames.preview} style={dynamicImageStyles(imagePath)}>
      <div className="container">
        <div className={classNames["preview__wrapper"]}>
          <h2 className={classNames["preview__title"]}>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Preview;
