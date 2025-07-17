import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./SecondaryButton.module.css";

function SecondaryButton({ children, style, onClick }) {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      className={`${styles.button} ${
        theme === "dark" ? styles.dark : theme === "light" ? styles.light : ""
      }`}
      style={{
        ...style,
        border: `2px solid var(--${theme}-border-clr)`,
        transition:
          "border-color 0.3s ease-in-out, background-color 0.3s ease-in-out",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
