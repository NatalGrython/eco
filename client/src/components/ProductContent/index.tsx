import React, { FC, useEffect } from "react";
import { Cart, Like } from "../../icons";
import { dynamicImageStyles } from "../../utils/dynamicImage";
import Dropzone from "../UI/Dropzone";
import EnergyContainer from "../EnergyContainer";
import classNames from "./index.module.scss";
import { Product as ProductType } from "../../types/client/product";
import defaultImage from "@images/default.png";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createProductAction,
  updateProductAction,
} from "../../store/product/action";
import { useCreateProduct } from "./hooks/useCreateProduct";
import AdminInput from "../UI/AdminInput";
import AdminTextArea from "../UI/AdminTextarea";
import { useUpdateProduct } from "./hooks/useUpdateProduct";
import AdminSelect from "../UI/AdminSelect";
import Mark from "./components/Mark";

interface ProductCreateProps {
  create: true;
  update?: undefined;
  product?: undefined;
  catalogId: string;
}

interface ProductUpdateProps {
  update: true;
  create?: undefined;
  product: ProductType;
  catalogId: string;
  productId: string;
}

interface ProductContentProps {
  update?: undefined;
  create?: undefined;
  product: ProductType;
}

type ProductProps =
  | ProductCreateProps
  | ProductUpdateProps
  | ProductContentProps;

export const options = [
  { text: "Нет маркировки", value: "" },
  { text: "Листок жизни", value: "list" },
  { text: "Знак качества XXI века", value: "quality" },
  { text: "ЕС Ecolabel", value: "eco" },
  { text: "Белый лебедь (Miljomarkt)", value: "bear" },
  { text: "Не испытано на животных (Animal friendly)", value: "animal" },
  { text: "Знак Vegan", value: "vegan" },
  { text: "Бокал-вилка", value: "fork" },
];
const ProductContent: FC<ProductProps> = (props) => {
  const { update, create, product } = props;
  if (create) {
    const { catalogId } = props;
    const { values, handleChange, handleSubmit, setFieldValue, errors } =
      useCreateProduct(Number(catalogId));

    return (
      <form onSubmit={handleSubmit} className={classNames.product__content}>
        <div className={classNames.product__preview__container}>
          <Dropzone
            file={
              values.product
                ? URL.createObjectURL(values.product)
                : defaultImage
            }
            error={errors.product}
            heightPreview="500px"
            widthPreview="550px"
            onDrop={(files) => {
              setFieldValue("product", files[0]);
            }}
          />
          <EnergyContainer
            values={values}
            onChange={handleChange}
            edited
            errors={{ ...errors }}
          />
        </div>
        <div className={classNames.product__info}>
          <div className={classNames.product__info_editable}>
            <span className={classNames.product__info__editable}>
              Имя товара:
            </span>
            <div className={classNames.product__info__input}>
              <AdminInput
                error={errors.name}
                value={values.name}
                onChange={handleChange}
                name="name"
                placeholder="Имя продукта"
              />
            </div>
          </div>

          <div className={classNames.product__details}>
            <div className={classNames.product__price_editable__container}>
              <span className={classNames.product__price_editable_title}>
                Цена:
              </span>
              <div
                className={classNames.product__price__editable_inputs_container}
              >
                <div className={classNames.product__price__input}>
                  <AdminInput
                    error={errors.price}
                    value={values.price}
                    onChange={handleChange}
                    name="price"
                    placeholder="Цена"
                  />
                </div>
                <span className={classNames.product__price_editable_title}>
                  /
                </span>
                <div className={classNames.product__price__input}>
                  <AdminInput
                    error={errors.weight}
                    value={values.weight}
                    onChange={handleChange}
                    name="weight"
                    placeholder="Вес"
                  />
                </div>
              </div>
            </div>
            <div className={classNames.product__description}>
              <div className={classNames.product__description__wrapper}>
                <h4 className={classNames.product__description__title}>
                  Описание
                </h4>
                <AdminTextArea
                  name="description"
                  value={values.description}
                  error={errors.description}
                  onChange={handleChange}
                />
              </div>
              <div className={classNames.product__description__wrapper}>
                <h4 className={classNames["product__description__title"]}>
                  Способ хранения
                </h4>
                <AdminTextArea
                  name="storage"
                  value={values.storage}
                  error={errors.storage}
                  onChange={handleChange}
                />
              </div>
              <div className={classNames.product__description__wrapper}>
                <h4 className={classNames["product__description__title"]}>
                  Состав
                </h4>
                <AdminTextArea
                  name="compound"
                  value={values.compound}
                  error={errors.compound}
                  onChange={handleChange}
                />
              </div>
              <div className={classNames.product__select__wrapper}>
                <h4 className={classNames["product__description__title"]}>
                  Маркировка
                </h4>
                <AdminSelect
                  options={options}
                  value={values.mark}
                  onChange={(value) => {
                    setFieldValue("mark", value);
                  }}
                />
                <Mark markType={values.mark} />
              </div>
            </div>
            <button type="submit" className={classNames.product__add_button}>
              <span>Добавить товар</span>
            </button>
          </div>
        </div>
      </form>
    );
  }

  if (update) {
    const { values, errors, handleChange, handleSubmit, setFieldValue } =
      useUpdateProduct(product);
    return (
      <form onSubmit={handleSubmit} className={classNames.product__content}>
        <div className={classNames.product__preview__container}>
          <Dropzone
            file={
              values.product
                ? URL.createObjectURL(values.product)
                : product.imagePath
            }
            error={errors.product}
            heightPreview="500px"
            widthPreview="550px"
            onDrop={(files) => {
              setFieldValue("product", files[0]);
            }}
          />
          <EnergyContainer
            onChange={handleChange}
            errors={errors}
            edited
            values={values}
          />
        </div>
        <div className={classNames.product__info}>
          <div className={classNames.product__info_editable}>
            <span className={classNames.product__info__editable}>
              Имя товара:
            </span>
            <div className={classNames.product__info__input}>
              <AdminInput
                error={errors.name}
                value={values.name}
                onChange={handleChange}
                name="name"
                placeholder="Имя продукта"
              />
            </div>
          </div>

          <div className={classNames.product__details}>
            <div className={classNames.product__price_editable__container}>
              <span className={classNames.product__price_editable_title}>
                Цена:
              </span>
              <div
                className={classNames.product__price__editable_inputs_container}
              >
                <div className={classNames.product__price__input}>
                  <AdminInput
                    error={errors.price}
                    value={values.price}
                    onChange={handleChange}
                    name="price"
                    placeholder="Цена"
                  />
                </div>
                <span className={classNames.product__price_editable_title}>
                  /
                </span>
                <div className={classNames.product__price__input}>
                  <AdminInput
                    error={errors.weight}
                    value={values.weight}
                    onChange={handleChange}
                    name="weight"
                    placeholder="Цена"
                  />
                </div>
              </div>
            </div>
            <div className={classNames.product__description}>
              <div className={classNames.product__description__wrapper}>
                <h4 className={classNames.product__description__title}>
                  Описание
                </h4>
                <AdminTextArea
                  name="description"
                  value={values.description}
                  error={errors.description}
                  onChange={handleChange}
                />
              </div>
              <div className={classNames.product__description__wrapper}>
                <h4 className={classNames["product__description__title"]}>
                  Способ хранения
                </h4>
                <AdminTextArea
                  name="storage"
                  value={values.storage}
                  error={errors.storage}
                  onChange={handleChange}
                />
              </div>
              <div className={classNames.product__description__wrapper}>
                <h4 className={classNames["product__description__title"]}>
                  Состав
                </h4>
                <AdminTextArea
                  name="compound"
                  value={values.compound}
                  error={errors.compound}
                  onChange={handleChange}
                />
              </div>
              <div className={classNames.product__select__wrapper}>
                <h4 className={classNames["product__description__title"]}>
                  Маркировка
                </h4>
                <AdminSelect
                  options={options}
                  value={values.mark}
                  onChange={(value) => {
                    setFieldValue("mark", value);
                  }}
                />
                <Mark markType={values.mark} />
              </div>
            </div>
            <button type="submit" className={classNames.product__add_button}>
              <span>Редактировать товар</span>
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className={classNames.product__content}>
      <div className={classNames.product__preview__container}>
        <div
          className={classNames.product__image}
          style={dynamicImageStyles(product.imagePath)}
        />
        <EnergyContainer
          values={{
            ...product,
          }}
        />
      </div>
      <div className={classNames.product__info}>
        <h3 className={classNames.product__title}>{product.name}</h3>

        <div className={classNames.product__details}>
          <div className={classNames.product__price__container}>
            <span className={classNames.product__price}>
              {product.price} ₽ / {product.weight} г
            </span>
            <div className={classNames.product__price__buttons}>
              <button className={classNames.product__price__button_like}>
                <Like liked={product.liked} />
              </button>
              <button className={classNames.product__price__button}>
                <Cart color="#fff" />
              </button>
            </div>
          </div>

          <div className={classNames.product__description}>
            <div className={classNames.product__description__wrapper}>
              <h4 className={classNames.product__description__title}>
                Описание
              </h4>

              <p className={classNames["product__description__text"]}>
                {product.description}
              </p>
            </div>
            <div className={classNames.product__description__wrapper}>
              <h4 className={classNames["product__description__title"]}>
                Способ хранения
              </h4>

              <p className={classNames["product__description__text"]}>
                {product.storage}
              </p>
            </div>
            <div className={classNames.product__description__wrapper}>
              <h4 className={classNames["product__description__title"]}>
                Состав
              </h4>

              <p className={classNames["product__description__text"]}>
                {product.compound}
              </p>
            </div>
            {product.mark !== "" && (
              <div className={classNames.product__select__wrapper}>
                <h4 className={classNames["product__description__title"]}>
                  Маркировка
                </h4>
                <Mark markType={product.mark} />
                <span className={classNames.product__mark__text}>
                  {options.find((item) => item.value === product.mark)?.text}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
