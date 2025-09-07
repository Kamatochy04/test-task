import { useAppDispatch, useAppSelector } from "./hooks";
import * as Yup from "yup";
import { setErrors, clearErrors } from "store/formSlice";

const validationSchema = {
  1: Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  }),
  2: Yup.object({
    city: Yup.string().required("City is required"),
    deliveryType: Yup.string().required("Delivery type is required"),
  }),
  3: Yup.object({}),
};

export const useFormValidation = () => {
  const { firstName, lastName, email, city, deliveryType } = useAppSelector(
    (state) => state.form
  );

  const dispatch = useAppDispatch();

  const validateStep = async (step: number) => {
    try {
      await validationSchema[step].validate(
        { firstName, lastName, email, city, deliveryType },
        { abortEarly: false }
      );
      dispatch(clearErrors());
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        error.inner.forEach((e) => {
          if (e.path) {
            const key = `${e.path}Error`;
            fieldErrors[key] = e.message;
          }
        });

        dispatch(setErrors(fieldErrors));
      }
      return false;
    }
  };

  return {
    validateStep,
  };
};
