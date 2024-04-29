import styles from "./index.module.scss";

const Category = ({ categoryData }) => {
  return (
    <>
      <div className={styles.category}>
        <img
          src={categoryData?.icons[0].url}
          alt="category name"
          className={styles.pic}
        />
        <div className={styles.text}>
          <h5 className={styles.title}>{categoryData?.name}</h5>
        </div>
      </div>
    </>
  );
};

export default Category;
