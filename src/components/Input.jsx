import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Input({ type, isPassword, placeholder }) {
  const { theme } = useContext(ThemeContext);
  return (
    <input
      style={{
        border: `2px solid var(--${theme}-border-clr)`,
        backgroundColor: `var(--${theme}-wrapper-clr)`,
        color: `var(--${theme}-text-clr)`,
        padding: "0.625rem",
        borderRadius: "0.5rem",
        fontSize: "1rem",
        width: "100%",
      }}
      type={isPassword ? "" : type}
      placeholder={placeholder}
      required
    />
  );
}

export default Input;
