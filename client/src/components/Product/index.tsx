import React, { FC, MouseEvent } from "react";
import { Cart, Edit, Like, Plus } from "../../icons";
import classNames from "./index.module.scss";
import { Product as ProductType } from "../../types/client/product";
import createProductImage from "@images/default-new.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateFavoriteAction } from "../../store/favorite/action";
import { updateBasketAction } from "../../store/basket/action";

type ProductPickedProps = Pick<
  ProductType,
  "id" | "imagePath" | "name" | "price" | "weight" | "liked"
>;

interface ProductPreviewProps extends ProductPickedProps {
  catalogPath: string;
  preview: true;
  create?: undefined;
  edit?: undefined;
}

interface ProductCreateProps {
  create: true;
  onCreate: () => void;
  photoPath?: string;
  id: number;
  preview?: undefined;
  edit?: undefined;
}

interface ProductEditProps extends ProductPickedProps {
  edit: true;
  preview?: undefined;
  create?: undefined;
  onEdit: () => void;
}

interface ProductOnlyProps extends ProductPickedProps {
  preview?: undefined;
  catalogPath?: undefined;
  create?: undefined;
  edit?: undefined;
}

export type ProductProps =
  | ProductPreviewProps
  | ProductCreateProps
  | ProductEditProps
  | ProductOnlyProps;

const Product: FC<ProductProps> = (props) => {
  const { edit, create, preview } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (preview) {
    const { name, imagePath, price, weight, catalogPath, id, liked } = props;
    const onClick = () => {
      navigate(`/product/${id}`);
    };
    const onClickCategory = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      navigate(catalogPath);
    };
    return (
      <div className={classNames.product}>
        <div
          onClick={onClick}
          className={classNames["product__image"]}
          style={{ backgroundImage: `url('${imagePath}')` }}
        >
          <button className={classNames["product__like_btn"]}>
            <Like liked={liked} />
          </button>
          <button
            onClick={onClickCategory}
            className={classNames["product_preview_catalog_btn"]}
          >
            <span>Смотреть категорию</span>
          </button>
        </div>
        <div className={classNames["product__info"]}>
          <h4 className={classNames["product__title"]}>{name}</h4>
          <span className={classNames["product__chars"]}>
            {price}₽ / {weight} г
          </span>
          <button className={classNames["product__buy_btn"]}>
            <Cart color="#fff" />
          </button>
        </div>
      </div>
    );
  }

  if (create) {
    const { photoPath } = props;
    return (
      <div className={classNames.product}>
        <div
          className={classNames["product__image"]}
          style={{
            backgroundImage: `url('${photoPath ?? createProductImage}')`,
          }}
        >
          <button
            onClick={props.onCreate}
            className={classNames["product__like_btn"]}
          >
            <Plus />
          </button>
        </div>
        <div className={classNames["product__info"]}>
          <h4 className={classNames["product__title"]}>Добавить новый </h4>
          <span className={classNames["product__chars"]}>
            товар в категорию
          </span>
        </div>
      </div>
    );
  }

  if (edit) {
    const { name, imagePath, price, weight, onEdit } = props;
    return (
      <div className={classNames.product}>
        <div
          className={classNames["product__image"]}
          style={{ backgroundImage: `url('${imagePath}')` }}
        >
          <button onClick={onEdit} className={classNames["product__like_btn"]}>
            <Edit />
          </button>
        </div>
        <div className={classNames["product__info"]}>
          <h4 className={classNames["product__title"]}>{name}</h4>
          <span className={classNames["product__chars"]}>
            {price}₽ / {weight} г
          </span>
        </div>
      </div>
    );
  }

  const { name, imagePath, price, weight, id, liked } = props;
  const onClick = () => {
    navigate(`/product/${id}`);
  };
  const onClickLike = (event: any) => {
    event.stopPropagation();
    if (liked) {
      dispatch(updateFavoriteAction([{ id, deleting: true }]));
    } else {
      dispatch(updateFavoriteAction([{ id }]));
    }
  };

  const onClickBye = (event: any) => {
    event.stopPropagation();
    dispatch(updateBasketAction([{ id }]));
  };

  return (
    <div className={classNames.product}>
      <div
        onClick={onClick}
        className={classNames["product__image"]}
        style={{ backgroundImage: `url('${imagePath}')` }}
      >
        <button
          onClick={onClickLike}
          className={classNames["product__like_btn"]}
        >
          <Like liked={liked} />
        </button>
      </div>
      <div className={classNames["product__info"]}>
        <h4 className={classNames["product__title"]}>{name}</h4>
        <span className={classNames["product__chars"]}>
          {price}₽ / {weight} г
        </span>
        <button onClick={onClickBye} className={classNames["product__buy_btn"]}>
          <Cart color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default Product;
