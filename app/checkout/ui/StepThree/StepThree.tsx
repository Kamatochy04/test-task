"use client";

import { useEffect, useState } from "react";
import styles from "../steps.module.scss";
import withFormPersist from "shared/hoc/withFormPersist";
import { useGetCartItemsQuery } from "store/api/cartApi";
import { PaidItem } from "widgets";
import { useAppSelector, useAppDispatch } from "shared/hook/hooks";
import { setCheckoutApproved } from "store/formSlice";

const StepThree = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.cart.items);
  const formData = useAppSelector((state) => state.form);

  const { isLoading } = useGetCartItemsQuery();

  useEffect(() => {
    const productsTotal = products.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(productsTotal + formData.deliveryPrice);
  }, [products, formData.deliveryPrice]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCheckoutApproved(e.target.checked));
  };

  return (
    <div className={styles.summary}>
      <div className={styles.section}>
        <h2>Products</h2>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className={styles.paidItems}>
            {products.map((product) => (
              <PaidItem {...product} key={product.id} />
            ))}
          </div>
        )}
      </div>
      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2>Customer Information</h2>
        <div className={styles.divider__wrapper}>
          <p className={styles.label}>First name</p>
          <p className={styles.deliver__inf}>{formData.firstName}</p>
        </div>
        <div className={styles.divider__wrapper}>
          <p className={styles.label}>Second name</p>
          <p className={styles.deliver__inf}>{formData.lastName}</p>
        </div>
        <div className={styles.divider__wrapper}>
          <p className={styles.label}>Email</p>
          <p className={styles.deliver__inf}>{formData.email}</p>
        </div>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkbox}
            onChange={handleCheckboxChange}
          />
          I approve this information isn’t real
        </label>
      </div>
      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2>Summary</h2>
        <div className={styles.section__container}>
          <p className={styles.simple__text}>Products</p>
          <p className={styles.price}>
            {products.reduce((sum, item) => sum + item.price, 0).toFixed(2)}$
          </p>
        </div>
        <div className={styles.section__container}>
          <p className={styles.simple__text}>
            {formData.deliveryType} delivery to <span>{formData.city}</span>
          </p>
          <p className={styles.price}>{formData.deliveryPrice}$</p>
        </div>
        <div className={styles.section__container}>
          <p className={styles.total}>Total</p>
          <p className={styles.price}>{totalPrice.toFixed(2)}$</p>
        </div>
      </div>
    </div>
  );
};

export default withFormPersist(StepThree);
