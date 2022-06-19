import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { object, string, ref, number, mixed } from "yup";
import { createProductAction } from "../../../store/product/action";

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
  mark: string;
}

const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

export const useCreateProduct = (catalogId: number) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  return useFormik<CreateForm>({
    initialValues: {
      product: null,
      name: "",
      price: 0,
      weight: 0,
      description: "",
      storage: "",
      compound: "",
      calories: 0,
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
      mark: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      if (values.product) {
        dispatch(
          createProductAction({ ...values, catalogId, product: values.product })
        );
        navigator("/");
      }
    },
    validationSchema: object({
      product: mixed()
        .required("Картинка обязательна")
        .test("format", "Файл не является картинкой", (value) => {
          if (value) {
            return SUPPORTED_FORMATS.includes(value.type);
          }
          return false;
        }),
      name: string().required("Обязательно к заполнению"),
      description: string().required("Обязательно к заполнению"),
      storage: string().required("Обязательно к заполнению"),
      compound: string().required("Обязательно к заполнению"),
      price: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным")
        .required("Обязательно к заполнению"),
      weight: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным")
        .required("Обязательно к заполнению"),
      calories: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным")
        .required("Обязательно к заполнению"),
      proteins: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным")
        .required("Обязательно к заполнению"),
      fats: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным")
        .required("Обязательно к заполнению"),
      carbohydrates: number()
        .typeError("Должно быть числом")
        .positive("Должно быть положительным")
        .required("Обязательно к заполнению"),
    }),
  });
};
