import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { number, object, string } from "yup";
import { updateUserAction } from "../../../../../store/user/action";
import { User } from "../../../../../types/client/user";

export const useUpdateUserInfo = (user: User | null) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      patronymic: user?.patronymic ?? "",
      email: user?.email ?? user?.login ?? "",
      address: user?.address ?? "",
      entrance: user?.entrance ?? "",
      intercom: user?.intercom ?? "",
      flat: user?.flat ?? "",
      floor: user?.floor ?? "",
      comment: user?.comment ?? "",
    },
    onSubmit: ({ ...values }) => {
      if (user) {
        dispatch(updateUserAction({ ...values, id: user.id }));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: object({
      name: string(),
      surname: string(),
      patronymic: string(),
      email: string().email("Должен быть правильный email адрес"),
      address: string(),
      entrance: number().typeError("Должено быть числом"),
      intercom: number().typeError("Должено быть числом"),
      flat: number().typeError("Должено быть числом"),
      floor: number().typeError("Должено быть числом"),
      comment: string(),
    }),
  });

  useEffect(() => {
    formik.setValues({
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      patronymic: user?.patronymic ?? "",
      email: user?.email ?? user?.login ?? "",
      address: user?.address ?? "",
      entrance: user?.entrance ?? "",
      intercom: user?.intercom ?? "",
      flat: user?.flat ?? "",
      floor: user?.floor ?? "",
      comment: user?.comment ?? "",
    });
  }, [user]);

  return formik;
};
