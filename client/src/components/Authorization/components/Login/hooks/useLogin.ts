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
    onSubmit: (values) => {
      dispatch(loginStartedAction(values));
    },
    validationSchema: object({
      password: string()
        .min(8, "Пароль должен быть больше 8 символов")
        .required("Обязательное поле"),
      login: string().required("Обязательное поле"),
    }),
  });
};
