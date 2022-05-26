import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCatalogAction } from "../../../../../store/catalog/action";
import defaultPhoto from "@images/default.png";
import { mixed, object, string } from "yup";
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

export const useCreateCatalog = () => {
  const [photoPreview, setPhotoPreview] = useState(defaultPhoto);
  const dispatch = useDispatch();
  return {
    ...useFormik<{
      name: string;
      catalog: File | null;
    }>({
      initialValues: {
        name: "",
        catalog: null,
      },
      onSubmit: (values, formik) => {
        if (values.catalog) {
          dispatch(createCatalogAction({ ...values, catalog: values.catalog }));
          formik.resetForm();
          setPhotoPreview(photoPreview);
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
      }),
    }),
    photoPreview,
    setPhotoPreview,
  };
};
