import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { object, string } from "yup";
import { loginStartedAction } from "../../../../../store/auth/actions";

export const useLogin = () => {
  const dispatch = useDispatch();

  return useFormik({
    initialValues: {
      password: "",
      login: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(loginStartedAction(values));
    },

    validationSchema: object({
      password: string()
        .trim()
        .min(8, "Пароль должен быть больше 8 символов")
        .required("Обязательное поле"),
      login: string().trim().required("Обязательное поле"),
    }),
  });
};
