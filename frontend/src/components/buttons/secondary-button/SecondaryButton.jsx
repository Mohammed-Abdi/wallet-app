import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import styles from "./SecondaryButton.module.css";

function SecondaryButton({ children, style }) {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      className={`${styles.button} ${
        theme === "dark" ? styles.dark : theme === "light" ? styles.light : ""
      }`}
      style={{
        ...style,
        border: `2px solid ${
          theme === "dark"
            ? "var(--dark-border-clr)"
            : theme === "light"
            ? "var(--light-border-clr)"
            : ""
        }`,
        transition:
          "border-color 0.3s ease-in-out, background-color 0.3s ease-in-out",
      }}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
