import React, { FC } from "react";
import Product from "../../../../components/Product";
import Dropzone from "../../../../components/UI/Dropzone";
import UserInput from "../../../../components/UI/UserInput";
import classNames from "./index.module.scss";
import { useCreateCatalog } from "./hooks/useCreateCatalog";

interface NewCatalogProps {}

const NewCatalog: FC<NewCatalogProps> = () => {
  const {
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
          <div className={classNames["new-catalog__wrapper"]}>
            <Product
              photoPath={photoPreview}
              onCreate={handleSubmit}
              create
              id={100}
            />
            <div className={classNames["new-catalog__draggle"]}>
              <div className={classNames["new-catalog__text__container"]}>
                <UserInput
                  name="name"
                  error={errors.name}
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Добавить имя категории"
                  type="text"
                />
                <span className={classNames["new-catalog__text"]}>
                  Загрузить обложку
                </span>
              </div>
              <Dropzone
                onDrop={(files) => {
                  setPhotoPreview(URL.createObjectURL(files[0]));
                  setFieldValue("catalog", files[0]);
                }}
                error={errors.catalog}
                file={photoPreview}
                widthPreview="620px"
                heightPreview="330px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCatalog;
