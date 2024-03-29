import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { object, string, number } from "yup";
import { RootState } from "../../../store";
import { createOrderAction } from "../../../store/order/actions";

const userSelector = (state: RootState) => state.user.user;

export const useCreateOrder = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  return useFormik({
    initialValues: {
      address: user?.address ?? "",
      entrance: user?.entrance ?? "",
      intercom: user?.intercom ?? "",
      flat: user?.flat ?? "",
      floor: user?.floor ?? "",
      comment: user?.comment ?? "",
      phone: "",
    },
    onSubmit: (values) => {
      //@ts-ignore
      dispatch(createOrderAction(values));
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: object({
      address: string().required("Обязательное поле"),
      entrance: number().required("Обязательное поле"),
      intercom: number().required("Обязательное поле"),
      flat: number().required("Обязательное поле"),
      floor: number().required("Обязательное поле"),
      comment: string().required("Обязательное поле"),
      phone: string().required("Обязательное поле"),
    }),
  });
};
