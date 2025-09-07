import { useAppDispatch, useAppSelector } from "shared/hook/hooks";
import styles from "../steps.module.scss";
import { setUserInfo } from "store/formSlice";
import { Input } from "components";
import withFormPersist from "shared/hoc/withFormPersist";

const StepOne = () => {
  const { email, lastName, firstName } = useAppSelector((state) => state.form);
  const { emailError, lastNameError, firstNameError } = useAppSelector(
    (state) => state.form.errors
  );
  const dispath = useAppDispatch();

  const onChange = (name: string, value: string) => {
    dispath(setUserInfo({ ...{ firstName, lastName, email }, [name]: value }));
  };
  return (
    <>
      {/* {isLoading ? <Loader /> : null} */}
      <div className={styles.formGroup}>
        <Input
          label="First Name"
          name="firstName"
          value={firstName}
          errorText={firstNameError}
          onChange={(event) => onChange("firstName", event.target.value)}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={lastName}
          errorText={lastNameError}
          onChange={(event) => onChange("lastName", event.target.value)}
        />
        <Input
          label="Email"
          name="email"
          value={email}
          onChange={(event) => onChange("email", event.target.value)}
          type="email"
          errorText={emailError}
        />
      </div>
    </>
  );
};

export default withFormPersist(StepOne);
