"use client";

import { useAppDispatch, useAppSelector } from "shared/hook/hooks";
import styles from "../steps.module.scss";
import { useGetCitiesQuery } from "store/api/cityApi";
import { DeliveryTabs, Dropdown } from "components";
import { setDeliveryInfo, setDeliveryPrice } from "store/formSlice";
import withFormPersist from "shared/hoc/withFormPersist";

const StepTwo = () => {
  const dispatch = useAppDispatch();
  const { cityError, deliveryTypeError } = useAppSelector(
    (state) => state.form.errors
  );
  const { data: cities, error, isLoading } = useGetCitiesQuery();
  const { city, deliveryType } = useAppSelector((state) => state.form);

  const handleDropdownChange = (name: string, value: string) => {
    dispatch(setDeliveryInfo({ [name]: value }));
  };

  const handleDeliveryChange = (type: string, price: number) => {
    console.log(type);
    dispatch(setDeliveryInfo({ deliveryType: type }));
    dispatch(setDeliveryPrice(price));
  };

  const cityOptions = cities
    ? cities.map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  const getDeliveryOptions = () => {
    const selectedCity = cities?.find((cityItem) => cityItem.name === city);
    const options = [];
    if (selectedCity) {
      if (selectedCity.delivery.fast !== null)
        options.push({ type: "fast", price: selectedCity.delivery.fast });
      if (selectedCity.delivery.regular !== null)
        options.push({ type: "regular", price: selectedCity.delivery.regular });
      if (selectedCity.delivery.slow !== null)
        options.push({ type: "slow", price: selectedCity.delivery.slow });
    }
    return options;
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных</p>;

  return (
    <div className={styles.formGroup}>
      <Dropdown
        label="City"
        name="city"
        value={city || ""}
        options={cityOptions}
        onChange={(value) => handleDropdownChange("city", value)}
        id="cityDropdown"
        errorText={cityError}
      />
      <div className={styles.deliveryContainer}>
        <label className={styles.label}>Delivery type</label>
        <DeliveryTabs
          deliveryOptions={getDeliveryOptions()}
          deliveryType={deliveryType}
          city={city}
          errorText={deliveryTypeError}
          onDeliveryChange={handleDeliveryChange}
        />
      </div>
    </div>
  );
};

export default withFormPersist(StepTwo);
