import styles from "./stepIndicator.module.scss";

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = ["Information", "Delivery", "Summary"];

  return (
    <div className={styles.stepIndicator}>
      {steps.map((stepName, index) => (
        <div
          key={stepName}
          className={`${styles.stepIndicator} ${
            currentStep > index + 1 ? styles.completed : ""
          } ${currentStep === index + 1 ? styles.active : ""}`}
        >
          {stepName}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
