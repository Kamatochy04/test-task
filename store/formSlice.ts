import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  deliveryType: string;
  deliveryPrice: number;
  step: number;
  errors: {
    firstNameError?: string;
    lastNameError?: string;
    emailError?: string;
    cityError?: string;
    deliveryTypeError?: string;
  };
  isCheckoutApproved: boolean;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

const initialState: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  deliveryType: "",
  deliveryPrice: 0,
  step: 1,
  errors: {},
  isCheckoutApproved: false,
};

const formSlice = createSlice({
  name: "formSlice",
  initialState,
  reducers: {
    clearForm: (state) => {
      state.firstName = initialState.firstName;
      state.lastName = initialState.lastName;
      state.email = initialState.email;
      state.city = initialState.city;
      state.deliveryType = initialState.deliveryType;
      state.deliveryPrice = initialState.deliveryPrice;
      state.errors = initialState.errors;
      state.isCheckoutApproved = initialState.isCheckoutApproved;
      state.step = 1;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setDeliveryInfo: (
      state,
      action: PayloadAction<{ city?: string; deliveryType?: string }>
    ) => {
      if (action.payload.city !== undefined) {
        state.city = action.payload.city;
      }
      if (action.payload.deliveryType !== undefined) {
        state.deliveryType = action.payload.deliveryType;
      }
    },
    setAllData: (state, action: PayloadAction<FormData>) => {
      return action.payload;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    handleNextStep: (state) => {
      state.step += 1;
    },
    handleBackStep: (state) => {
      state.step -= 1;
    },
    setDeliveryPrice: (state, action: PayloadAction<number>) => {
      state.deliveryPrice = action.payload;
    },
    setErrors: (state, action: PayloadAction<Partial<FormData["errors"]>>) => {
      state.errors = { ...state.errors, ...action.payload };
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    clearFieldError: (state, action: PayloadAction<string>) => {
      const field = `${action.payload}Error` as keyof FormData["errors"];
      if (state.errors[field]) {
        delete state.errors[field];
      }
    },
    setCheckoutApproved: (state, action: PayloadAction<boolean>) => {
      state.isCheckoutApproved = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUserInfo.matchFulfilled,
      (state, action) => {
        const userData = JSON.parse(sessionStorage.getItem("formData") || "{}");
        console.log(action.payload);
        state.firstName =
          userData.firstName === "" || userData.firstName === undefined
            ? action.payload.firstName
            : userData.firstName;
        state.email =
          userData.email === "" || userData.email === undefined
            ? action.payload.email
            : userData.email;
        state.lastName =
          userData.lastName === "" || userData.lastName === undefined
            ? action.payload.lastName
            : userData.lastName;
      }
    );
  },
});

export const {
  setStep,
  handleNextStep,
  handleBackStep,
  setUserInfo,
  setDeliveryInfo,
  setAllData,
  setDeliveryPrice,
  setErrors,
  clearErrors,
  clearFieldError,
  clearForm,
  setCheckoutApproved,
} = formSlice.actions;

export default formSlice.reducer;
