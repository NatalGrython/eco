import React, { FC } from "react";
import { FileRejection, DropEvent } from "react-dropzone";
import Dropzone from "../../../../components/UI/Dropzone";
import classNames from "./index.module.scss";

interface CatalogPreviewCreateProps {
  image: string;
  onDrop:
    | (<T extends File>(
        acceptedFiles: T[],
        fileRejections: FileRejection[],
        event: DropEvent
      ) => void)
    | undefined;
}

const CatalogPreviewCreate: FC<CatalogPreviewCreateProps> = ({
  image,
  onDrop,
}) => {
  return (
    <div
      className={classNames["category_card"]}
      //   style={{
      //     backgroundImage: `url('${imagePath}')`,
      //   }}
    >
      <Dropzone
        widthPreview="230px"
        heightPreview="320px"
        file={image}
        onDrop={onDrop}
      />
      {/* <h3 className={classNames["category_card_title"]}>{title}</h3> */}
      <div className={classNames.category_card_new}>
        Добавить новую миниатюру
      </div>
      {/* <button className={classNames["category_card_button"]} onClick={onClick}>
        <ArrowRight />
      </button> */}
    </div>
  );
};

export default CatalogPreviewCreate;
