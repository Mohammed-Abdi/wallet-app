import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./ActionButton.module.css";

function ActionButton({ children, style, onClick }) {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${
        theme === "dark" ? styles.dark : theme === "light" ? styles.light : ""
      }`}
      style={style}
    >
      {children}
    </button>
  );
}

export default ActionButton;
