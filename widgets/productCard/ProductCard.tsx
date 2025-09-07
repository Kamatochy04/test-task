import React from "react";
import styles from "./productCard.module.scss";
import { DeleteIcon } from "shared/assets/icons/DeleteIcon";

interface ProductCardProps {
  name: string;
  manufacturer: string;
  price: number;
  imageUrl: string;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  manufacturer,
  price,
  imageUrl,
  onClick,
}) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.card__img}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className={styles.card__descr}>
        <h3 className={styles.card__descrTitle}>
          {name} - ${price.toFixed(2)}
        </h3>
        <h3 className={styles.card__descrText}>By: {manufacturer}</h3>
      </div>
      <button className={styles.deleted} onClick={onClick}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default ProductCard;
