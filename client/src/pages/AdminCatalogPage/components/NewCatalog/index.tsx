import React, { FC } from "react";
import Dropzone from "../../../../components/UI/Dropzone";
import UserInput from "../../../../components/UI/UserInput";
import classNames from "./index.module.scss";
import { useCreateCatalog } from "./hooks/useCreateCatalog";
import CatalogPreview from "../../../../components/CatalogPreview";
import CatalogPreviewCreate from "../CatalogPreview";
import UserButton from "../../../../components/UI/UserButton";

interface NewCatalogProps {}

const NewCatalog: FC<NewCatalogProps> = () => {
  const {
    miniPreview,
    setMiniPreview,
    photoPreview,
    setPhotoPreview,
    values,
    handleSubmit,
    handleChange,
    errors,
    setFieldValue,
  } = useCreateCatalog();

  return (
    <div className={classNames["new-catalog"]}>
      <div className="container">
        <div className={classNames["new-catalog__content"]}>
          <h3 className={classNames["new-catalog__title"]}>
            Создать новую категорию товаров
          </h3>
          <div className={classNames["new-catalog__text__container"]}>
            <UserInput
              name="name"
              error={errors.name}
              value={values.name}
              onChange={handleChange}
              placeholder="Добавить имя категории"
              type="text"
            />
          </div>
          <div className={classNames["new-catalog__wrapper"]}>
            <div className={classNames["new-catalog__draggle"]}>
              <span className={classNames["new-catalog__text"]}>
                Загрузить обложку
              </span>
              <CatalogPreviewCreate
                image={miniPreview}
                onDrop={(files) => {
                  setMiniPreview(URL.createObjectURL(files[0]));
                  setFieldValue("mini", files[0]);
                }}
              />
            </div>
            <div className={classNames["new-catalog__draggle"]}>
              <span className={classNames["new-catalog__text"]}>
                Загрузить обложку
              </span>
              <Dropzone
                onDrop={(files) => {
                  setPhotoPreview(URL.createObjectURL(files[0]));
                  setFieldValue("catalog", files[0]);
                }}
                error={errors.catalog}
                file={photoPreview}
                widthPreview="820px"
                heightPreview="330px"
              />
              <UserButton
                onClick={() => {
                  handleSubmit();
                }}
              >
                Cоздать категорию
              </UserButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCatalog;
