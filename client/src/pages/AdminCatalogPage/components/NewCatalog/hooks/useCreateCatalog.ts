import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCatalogAction } from "../../../../../store/catalog/action";
import mini from "@images/mini.png";
import big from "@images/big.png";
import { mixed, object, string } from "yup";
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

export const useCreateCatalog = () => {
  const [photoPreview, setPhotoPreview] = useState(big);
  const [miniPreview, setMiniPreview] = useState(mini);
  const dispatch = useDispatch();
  return {
    ...useFormik<{
      name: string;
      catalog: File | null;
      mini: File | null;
    }>({
      initialValues: {
        name: "",
        catalog: null,
        mini: null,
      },
      onSubmit: (values, formik) => {
        if (values.catalog && values.mini) {
          dispatch(createCatalogAction({ ...values, catalog: values.catalog }));
          formik.resetForm();
          setPhotoPreview(big);
          setMiniPreview(mini);
        }
      },
      validationSchema: object({
        name: string().required("Обязательно к заполнению"),
        catalog: mixed()
          .required("Картинка обязательна")
          .test("format", "Файл не является картинкой", (value) => {
            if (value) {
              return SUPPORTED_FORMATS.includes(value.type);
            }
            return false;
          }),
        mini: mixed()
          .required("Картинка обязательна")
          .test("format", "Файл не является картинкой", (value) => {
            if (value) {
              return SUPPORTED_FORMATS.includes(value.type);
            }
            return false;
          }),
      }),
    }),
    photoPreview,
    setPhotoPreview,
    miniPreview,
    setMiniPreview,
  };
};
