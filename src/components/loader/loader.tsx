import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-medium">Жди</h2>
    </div>
  );
}
