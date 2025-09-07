import { useAppSelector, useAppDispatch } from "shared/hook/hooks";
import { useEffect } from "react";
import { setAllData } from "store/formSlice";

const withFormPersist = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line react/display-name
  return () => {
    const formData = useAppSelector((state) => state.form);
    const dispatch = useAppDispatch();

    useEffect(() => {
      const savedFormData = sessionStorage.getItem("formData");
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        dispatch(setAllData(parsedData));
      }
    }, []);

    useEffect(() => {
      sessionStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    return <WrappedComponent />;
  };
};

export default withFormPersist;
