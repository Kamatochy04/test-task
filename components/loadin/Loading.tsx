import styles from "./loading.module.scss";

const Loader = () => {
  return (
    <div className={styles.bg}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loader;
