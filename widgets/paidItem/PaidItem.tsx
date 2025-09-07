import React from "react";
import styles from "./paidItem.module.scss";

interface ProductCardProps {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  imageUrl: string;
  onRemove?: () => void;
}

const PaidItem: React.FC<ProductCardProps> = ({
  name,
  manufacturer,
  price,
  imageUrl,
}) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.card__img}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className={styles.card__descr}>
        <h3 className={styles.text}>{name}</h3>
        <p className={styles.card__descrText}>By: assadadsa {manufacturer}</p>
      </div>
      <div className={styles.price}>${price.toFixed(2)}</div>
    </div>
  );
};

export default PaidItem;
