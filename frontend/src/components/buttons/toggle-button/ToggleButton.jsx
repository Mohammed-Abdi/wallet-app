import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./ToggleButton.module.css";

function ToggleButton({ color, children, onClick }) {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      onClick={onClick ? onClick : null}
      className={`${styles.button} ${
        theme === "dark" ? styles.dark : theme === "light" ? styles.light : ""
      }`}
      style={{ color: color }}
    >
      {children}
    </button>
  );
}

export default ToggleButton;
