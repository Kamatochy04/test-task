import styles from "./tab.module.scss";

interface DeliveryOption {
  type: string;
  price: number;
}

interface DeliveryTabsProps {
  deliveryOptions: DeliveryOption[];
  deliveryType: string;
  city: string;
  onDeliveryChange: (type: string, price: number) => void;
  errorText?: string;
}

const DeliveryTabs: React.FC<DeliveryTabsProps> = ({
  deliveryOptions,
  deliveryType,
  city,
  onDeliveryChange,
  errorText,
}) => {
  return (
    <div>
      <div className={styles.deliveryTabs}>
        {deliveryOptions.length > 0 ? (
          deliveryOptions.map((option) => (
            <button
              key={option.type}
              className={`${styles.tab} ${
                deliveryType === option.type ? styles.active : ""
              }`}
              onClick={() => onDeliveryChange(option.type, option.price)}
              disabled={city === ""}
            >
              {option.type.charAt(0).toUpperCase() + option.type.slice(1)} - $
              {option.price}
            </button>
          ))
        ) : (
          <p className={styles.noOptions}>Нет доступных вариантов доставки</p>
        )}
      </div>
      {errorText && <p className={styles.errorText}>{errorText}</p>}
    </div>
  );
};

export default DeliveryTabs;
