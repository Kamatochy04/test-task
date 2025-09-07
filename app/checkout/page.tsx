"use client";

import { useRouter } from "next/navigation";
import styles from "./checkout.module.scss";
import { StepIndicator } from "../../widgets";
import { useAppDispatch, useAppSelector } from "shared/hook/hooks";
import { handleNextStep, handleBackStep, clearForm } from "store/formSlice";
import { prevButtonText, NextButtonText } from "shared/assets/buttonText";
import { useFormValidation } from "shared/hook/useFormValidation";
import StepTwo from "./ui/stepTwo/StepTwo";
import StepOne from "./ui/stepOne/StepOne";
import { Button, Loader } from "components";
import StepThree from "./ui/StepThree/StepThree";
import { FormEvent, useEffect } from "react";
import { useGetUserInfoQuery } from "store/api/userApi";

export default function Checkout() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { step, isCheckoutApproved } = useAppSelector((state) => state.form);
  const { isLoading, refetch } = useGetUserInfoQuery();

  const { validateStep } = useFormValidation();

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("formData");
      dispatch(clearForm());
    };
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleNext = async () => {
    const isValid = await validateStep(step);

    if (!isValid) return;

    if (step === 3 && !isCheckoutApproved) {
      alert("Please approve the information before placing the order.");
      return;
    }

    if (step !== 3) {
      dispatch(handleNextStep());
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== 3) return;

    if (step === 3 && isCheckoutApproved) {
      router.push("/success");
    } else if (step === 3 && !isCheckoutApproved) {
      alert("Please approve the information before placing the order.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={submitForm}>
        <div className={styles.wrapper__header}>
          <h1 className={styles.title}>Checkout</h1>
          <StepIndicator currentStep={step} />
        </div>
        {isLoading ? <Loader /> : null}
        <div className={styles.wrapper__content}>
          <div className={styles.wrapper__contentList}>
            {step === 1 && <StepOne />}
            {step === 2 && <StepTwo />}
            {step === 3 && <StepThree />}
          </div>
        </div>
        <div className={styles.wrapper__footer}>
          <Button
            type="submit"
            onClick={handleNext}
            disabled={step === 3 && !isCheckoutApproved}
          >
            {NextButtonText[step]}
          </Button>
          <Button
            onClick={() => dispatch(handleBackStep())}
            variant="secondary"
            disabled={step === 1}
          >
            {prevButtonText[step]}
          </Button>
        </div>
      </form>
    </div>
  );
}
