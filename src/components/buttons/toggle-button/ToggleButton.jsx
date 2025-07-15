import { useContext } from "react";
import styles from "./ToggleButton.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

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
