import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { object, string, ref, number, mixed } from "yup";
import { updateProductAction } from "../../../store/product/action";
import { Product } from "../../../types/client/product";

interface CreateForm {
  product: null | File;
  name: string;
  price: number;
  weight: number;
  description: string;
  storage: string;
  compound: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

export const useUpdateProduct = (product: Product) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  return useFormik<CreateForm>({
    initialValues: {
      product: null,
      name: product.name,
      price: product.price,
      weight: product.weight,
      description: product.description,
      storage: product.storage,
      compound: product.compound,
      calories: product.calories,
      proteins: product.proteins,
      fats: product.fats,
      carbohydrates: product.carbohydrates,
    },
    onSubmit: (values) => {
      if (values.product) {
        dispatch(
          updateProductAction({
            ...values,
            product: values.product,
            productId: product.id,
          })
        );
      } else {
        dispatch(
          updateProductAction({
            ...values,
            product: undefined,
            productId: product.id,
          })
        );
      }
      navigator("/");
    },
    validationSchema: object({
      product: mixed().test("format", "Файл не является картинкой", (value) => {
        if (value === null) {
          return true;
        }
        if (value !== null) {
          return SUPPORTED_FORMATS.includes(value.type);
        }
        return false;
      }),
      name: string(),
      description: string(),
      storage: string(),
      compound: string(),
      price: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным"),
      weight: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным"),
      calories: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным"),
      proteins: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным"),
      fats: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным"),
      carbohydrates: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным"),
    }),
  });
};
