import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { object, string, ref } from "yup";
import { registrationStartedAction } from "../../../../../store/auth/actions";

export const useRegistration = () => {
  const dispatch = useDispatch();

  return useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      login: "",
    },
    onSubmit: (values) => {
      dispatch(registrationStartedAction(values));
    },
    validationSchema: object({
      password: string()
        .min(8, "Пароль должен быть больше 8 символов")
        .required("Обязательное поле"),
      confirmPassword: string()
        .equals([ref("password")], "Должен совпадать с паролем")
        .required("Обязательное поле"),
      login: string().required("Обязательное поле"),
    }),
  });
};
