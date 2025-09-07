import * as Yup from "yup";

export const stepValidations = {
  1: Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  }),
  2: Yup.object({
    city: Yup.string().required("City is required"),
    deliveryType: Yup.string().required("Choose delivery type"),
  }),
  3: Yup.object({
    approve: Yup.boolean().oneOf([true], "You must approve information"),
  }),
};
